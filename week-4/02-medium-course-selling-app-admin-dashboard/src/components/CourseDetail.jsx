/* eslint-disable react/prop-types */
import React from "react";
import {useParams} from "react-router-dom";
import {Card, TextField, Button, Typography} from "@mui/material";
import "../App.css";
import "../courses.css";
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
    useSetRecoilState
} from 'recoil';
import axios from "axios";
function CourseDetail() {
    console.count("Course detail");
    let {courseId} = useParams();
    // only setCourses
    const setCourses = useSetRecoilState(coursesState);
    
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
            } else {
                alert("not countged in");
            }
        })
    }

    React.useEffect(() => {
        getCourses();
    }, []);

    return  <>
        <Typography variant={"h6"}> Update Course Page</Typography>
        <div className="course-container">
            <CourseCard courseId={courseId} />
            <UpdateCard courseId={courseId} />
        </div>
    </>

} 
function CourseCard(props) {
    // read only
    const courses = useRecoilValue(coursesState);
    let course = courses.find(c => c._id == props.courseId);
    console.count("Course Card "+courses);
    if(!course) {
        return <div>404 Course not found</div>;
    }
    return <Card className="card">
        <Typography className="title" variant={"h6"} textAlign={"center"}>{course.title}</Typography>
        <Typography className="description" variant={"subtitle1"} textAlign={"center"}>{course.description}</Typography>  
        <img src={course.imageLink} alt="course" />
    </Card>
}
function UpdateCard(props) {
    console.count("update card");
    const [courses, setCourses] = useRecoilState(coursesState);
    const [course, setCourse] = new React.useState(
        {
            _id: props.courseId,
            title: "",
            description: "",
            imageLink: "",
        }
    );
    React.useEffect(() => {
        console.count("useEffect hook from update card");
        const courseReq = courses.find(c => c._id == props.courseId);
        if(courseReq) setCourse(courseReq);
    }, [courses]);
    function saveCourse(id) {
        fetch("http://localhost:3000/admin/courses/"+id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(course)
        }).then(res => res.json())
        .then(data => {
            if(data.message !== "Course updated successfully") return;
            setCourses(prev => {
                const res = [...prev]
                const index = res.findIndex(c => c._id == id);
                res[index] = course;
                return [...res];
            })
        })
    }

    return <>
    <Card className="container">
        <TextField 
            fullWidth={true}
            label="Title"
            variant="outlined"
            onChange={e=> setCourse(prev => ({...prev, title: e.target.value}))}
            value={course.title}
        />
        <TextField  
            fullWidth={true}
            label="Description"
            variant="outlined"
            onChange={e => setCourse(prev => ({...prev, description: e.target.value}))}
            value={course.description}
        />  
        <TextField  
            fullWidth={true}
            label="imageLink"
            variant="outlined"
            onChange={e => setCourse(prev => ({...prev, imageLink: e.target.value}))}
            value={course.imageLink}
        />

        <Button 
            onClick={() => saveCourse(props.courseId)} 
            className="btn"
            variant="contained"
        >
            Save Course
        </Button>
    </Card>
    </>
}

export default CourseDetail;

const coursesState = atom({
    key: 'coursesState',
    default: [],
})