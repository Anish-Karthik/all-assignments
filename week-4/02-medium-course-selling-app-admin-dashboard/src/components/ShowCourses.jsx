/* eslint-disable react/prop-types */
import React from "react";
import {Card, TextField, Button, Typography} from "@mui/material";
import "../App.css";
import "../courses.css";

function ShowCourses() {
    const [courses, setCourses] = React.useState([]);
    // Add code to fetch courses from the server
    // and set it in the courses state variable.
    function getCourses() {
        fetch("http://localhost:3000/admin/courses", {
            type: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => res.json())
        .then(data => {
            if(data.courses) {
                setCourses(data.courses);
                // console.log(courses);
            } else {
                alert("not logged in");
            }
        })
    }

    React.useEffect(() => {
        getCourses();
    }, []);

    console.log(courses);
    return  <div className="course-container">
        {courses.map(course => <Course 
            key={course._id} {...course} 
        />)}
    </div>
} 

function Course(props) {
    console.log(props);
    return <Card className="card" onClick={() => window.location.href=`/course/${props._id}` }>
        <Typography className="title" variant={"h6"} textAlign={"center"}>{props.title}</Typography>
        <Typography className="description" variant={"subtitle1"} textAlign={"center"}>{props.description}</Typography>  
        <img src={props.imageLink} alt="course" />
    </Card>
}

export default ShowCourses;