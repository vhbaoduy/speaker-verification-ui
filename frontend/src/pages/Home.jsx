import React from "react";
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import { Container } from "@mui/system";
// import Enrollment from "./Enrollment";
import { useNavigate } from "react-router-dom";
import "../styles/home.css"


const Home = () => {
    const navigate = useNavigate();
    const navigateToEnrollment = () => {
        // 👇️ navigate to /contacts
        navigate('/enrollment');
      };
    return (
        <div class="background">
            <div class="my-home">
            <button class="my-button" onClick={navigateToEnrollment}>
            Enroll
            </button>
            </div>
            <div class="my-home">
                <button class="my-button" >
                Test
                </button>
            </div>
        </div>
            
        
       
  );
}

export default Home;