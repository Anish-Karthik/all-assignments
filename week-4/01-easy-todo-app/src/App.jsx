
import { useState, useEffect } from 'react'
import './App.css'
import Todo from './Todo'
function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({title: '', description: ''});

  function getTodos() {
    fetch('http://localhost:3000/todos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(data => {
        setTodos(data);
      })
  }
  function addTodo({title, description}) {
    fetch('http://localhost:3000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        description: description
      })
    }).then(res => {
      if (res.status === 201) {
        getTodos();
      }
    });
  }
  function deleteTodo (id) {
    fetch(`http://localhost:3000/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.status === 200) {
        getTodos();
      }
    });
  }

  useEffect(() => {
    getTodos();
  }, []);

  const handleNewTodoChange = (event) => {
    setNewTodo( (prevState) => ({...prevState, [event.target.name]: event.target.value}));
  }

  return (
    <>
      <div>
        <h1>Easy Todo App</h1>
        <input 
          type="text"
          placeholder='Title'  
          name='title'
          onChange={handleNewTodoChange} 
          value={newTodo.title}
        />
        <br />
        <input type="text" 
          placeholder='Description' 
          name='description'
          onChange={handleNewTodoChange} 
          value={newTodo.description}
        /> 
        <br />
        <button onClick={() =>addTodo(newTodo)}>Add Todo</button>
        {todos.map(todo => <Todo key={todo.id} {...todo} onClickDelete={(id) => deleteTodo(id)} />)}
      </div>
    </>
  )
}




export default App
