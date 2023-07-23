import { Typography, Button } from "@mui/material";
import "../App.css";

function Appbar() {
  const route = window.location.href.split("/")[3];
  console.log(route);
  return (
    <>
    <div className="appbar"> 
      <div>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Coursera
      </Typography>
      </div>
      <div className="right">
        {route === "courses" &&
        <Button variant="contained" onClick={() => {window.location.href = "/addCourse"}}>Add Course</Button>
        }
        {route !== "register" && (route === "login" || route === "" ) &&
          <Button variant="contained"
            onClick={() => {window.location.href = "/register"}}
          >
            SIGNUP
          </Button>
        }
        {route !== "login" && (route === "register" || route === "" ) &&
          <Button variant="contained"
            onClick={() => {window.location.href = "/login"}}          
          >
            SIGNIN
          </Button>
        }
        {localStorage.getItem("token") &&
          <Button variant="contained"
          onClick={() => {
            localStorage.setItem("token", null); 
            window.location.href = "/";
          }}          
          >
            LOGOUT
          </Button>
        }
      </div>
    </div>
    </>
  );
}

export default Appbar;