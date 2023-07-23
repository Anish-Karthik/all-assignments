
import { useState, useEffect } from "react";
import {Card} from "@mui/material";
import Button from "@mui/material/Button";

// import css file named app which is one level abiove this file
import "../App.css";

/// This is the landing page. You need to add a link to the login page here.
/// Maybe also check from the backend if the user is already logged in and then show them a logout button
/// Logging a user out is as simple as deleting the token from the local storage.
function Landing() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // [state, setState
    const token = localStorage.getItem("token");
    useEffect(() =>{
        console.log(token);
        if(token) {
            setIsLoggedIn(true);
        }
    }, []);
    
    const Logout = () => {
        if(!token) return;
        localStorage.removeItem("token");
        setIsLoggedIn(false);
    }


    return <Card className={'container'}>
        <h1>Welcome to course selling website!</h1>
        <Button
            onClick={() => {window.location.href='/register'}} 
            className={"btn"}
            variant="contained"
        >Admin Register</Button>
        <Button
            onClick={() => {window.location.href='/login'}} 
            className={"btn"}
            variant="contained"
        >Admin Login</Button>
        {isLoggedIn && 
        <>
            <Button variant="contained" onClick={Logout}>Logout</Button>
            <a href="/courses">Courses</a>
        </>
        }
    </Card>
}

export default Landing;