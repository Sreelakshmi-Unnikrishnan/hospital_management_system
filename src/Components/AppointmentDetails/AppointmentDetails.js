import React, { useState, useEffect } from "react";
import axios from "axios";
import { server } from "../API/Server";
import {useHistory,Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import hosp from "../Images/hosp.jpg";


function AppointmentDetails() {
    var username = localStorage.getItem("doctor_name");
    var token = localStorage.getItem("doctor_token");
    var id = localStorage.getItem("id");
    var history = useHistory();
    const [data, setData] = useState([]);


    function logoutFun() {
        localStorage.removeItem("doctor_name");
        localStorage.removeItem("doctor_token");
        localStorage.removeItem("id");
        history.push("/doctorlogin/");
      }
    
      useEffect(() => {
        if (!username && !token) {
          history.push("/doctorlogin/");
        }
      });


    useEffect(() => {
        axios.get(`${server}/appointment_details/${token}/`).then((res) => {
          console.log("------", res.data);
          setData(res.data)
          // console.log("------===", res.data["id"]);
          
        });
      }, []);
  return (
    <div>
         <nav>
        <ul className="links">
          <li className="links-li"></li>
          <li>
            <Link style={{ textDecoration: "none", fontWeight: "bold" }}>
              {`Welcome ${username}`}
            </Link>
          </li>
          <li>
            <Link
              to="/doctorlogin/"
              onClick={logoutFun}
              style={{
                textDecoration: "none",
                color: "red",
                fontWeight: "bold",
              }}
            >
              Logout
            </Link>
          </li>
          </ul>
          </nav>
          <img src={hosp} alt="" className="banner-img"/>
      <h1>Our Services</h1>
      <div style={{display:"flex",flexDirection:"row",flex: "0 0 10%",flexWrap:"wrap"}}>
      { data && data.map((data, index) => {
        localStorage.setItem("id",data.id)
        return(
        <Card sx={{ width: 400, backgroundColor: "yellow", marginLeft: 20, marginTop:10}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
         Patient Name: {data.patient_name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Appointment Date: {data.appointmentDate}
        </Typography>
        <Typography variant="body2">
        Symptoms : {data.symptoms}
        </Typography>
        </CardContent>
    </Card>
    )
})}
</div>
    </div>
  )
}

export default AppointmentDetails