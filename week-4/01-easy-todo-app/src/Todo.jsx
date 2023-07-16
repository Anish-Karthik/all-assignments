/* eslint-disable react/prop-types */

function Todo(props) {
  return <div>
    <h3>{props.title}</h3>
    <p>{props.description}</p>
    <button onClick={() => props.onClickDelete(props.id)}>Delete</button>
  </div>
}

export default Todo;