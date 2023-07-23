import React from "react";
import {Card, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import "../App.css";
import axios from "axios";
/// File is incomplete. You need to add input boxes to take input for users to register.
function Register() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    async function register() {
        const response = await axios.post("http://localhost:3000/admin/signup", {
            username: email,
            password: password
        });
        const data = response.data;
        console.log(data);
        window.location.href = "/login";
    };


    return <>
    <div className="container"> <h3>Register to admin dashboard</h3>  </div>
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
            onClick={register} 
            className="btn"
            variant="contained"
        >
            Register
        </Button>
        Already a user? <a href="/login">Login</a>
    </Card>
    </>;

}

export default Register;