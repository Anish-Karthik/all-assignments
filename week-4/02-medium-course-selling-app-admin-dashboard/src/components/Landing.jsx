
import { useState, useEffect } from "react";
import {Button, Card} from "@mui/material";

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


    return <Card>
        <h1>Welcome to course selling website!</h1>
        <Button
            onClick={() => {window.location.href='/register'}} 
            style={{backgroundColor: "brown"}} 
        >Register</Button>
        <br/>
        <Button
            onClick={() => {window.location.href='/login'}} 
            style={{backgroundColor: "brown"}} 
        >Login</Button>
        {isLoggedIn && 
            <>
                <br/>
                <a href="/courses">Courses</a>
                <br/>
                <a onClick={Logout}>Logout</a>
            </>
        }
    </Card>
}

export default Landing;