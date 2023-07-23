import React from "react";
import { Card, TextField, Button, Typography } from "@mui/material";
/// You need to add input boxes to take input for users to create a course.
/// I've added one input so you understand the api to do it.
function CreateCourse() {
    const [course, setCourse] = new React.useState(
        {
            title: "",
            description: "",
            imageLink: "",
        }
    );
    React.useState(() =>{
        setCourse(prev => ({...prev, imageLink:"https://picsum.photos/200"}));
    })
    function addCourse() {
        fetch("http://localhost:3000/admin/courses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(course)
        }).then(res => res.json())
        .then(data => {
            if(data.courseId) {
                alert("added succesfully");
            } else {
                alert("not logged in");
            }
        })
    }

    return <>
    <Typography variant={"h6"}> Create Course Page
    </Typography>
    <Card className="container">
        <TextField 
            fullWidth={true}
            id="outlined-basic"
            label="Title"
            variant="outlined"
            onChange={e=> setCourse(prev => ({...prev, title: e.target.value}))}
        />
        <TextField  
            fullWidth={true}
            id="outlined-basic"
            label="Description"
            variant="outlined"
            onChange={e => setCourse(prev => ({...prev, description: e.target.value}))}
        />
        <TextField  
            fullWidth={true}
            id="outlined-basic"
            label="imageLink"
            variant="outlined"
            onChange={e => setCourse(prev => ({...prev, imageLink: e.target.value}))}
            value={course.imageLink}
        />

        <Button 
            onClick={addCourse} 
            className="btn"
            variant="contained"
        >
            Add Course
        </Button>

    </Card>
    </>
}
export default CreateCourse;


