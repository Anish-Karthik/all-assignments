import React from "react";
import {Card, TextField, Button} from "@mui/material";
import axios from 'axios';

/// File is incomplete. You need to add input boxes to take input for users to login.
function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    async function login() {
        const res = await axios.post("http://localhost:3000/admin/login", {
            username: email,
            password: password
        });
        const data = res.data;
        alert(data.message+data.token);
        if(res.status === 200) {
            localStorage.setItem("token", data.token);
            window.location.href = "/courses";
        } else {
            alert("Invalid email or password");
        }
    }

    return <>
    <div className="container"> <h3>Login to admin dashboard</h3>  </div>
    <Card className={'container'}>
        <TextField 
            fullWidth={true}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            onChange={e => setEmail(e.target.value)}
        />
        <TextField  
            fullWidth={true}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            onChange={e =>  setPassword(e.target.value)}
        />

        <Button 
            onClick={login} 
            className="btn"
            variant="contained"
        >
            Login
        </Button>
        New here? <a href="/register">Register</a>
    </Card>
    </>;
}

export default Login;