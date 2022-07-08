import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import hosp from "../Images/hosp.jpg";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import axios from "axios";
import { server } from "../API/Server";
// import axios from "axios";
// import { server } from "../API/Server";

function PatientHome() {
    var username = localStorage.getItem("patient_name");
    var token = localStorage.getItem("patient_token");
    var id = localStorage.getItem("id");
    var history = useHistory();
    const [data, setData] = useState([]);


    function logoutFun() {
        localStorage.removeItem("patient_name");
        localStorage.removeItem("patient_token");
        localStorage.removeItem("id");
        history.push("/login/");
      }
    
      useEffect(() => {
        if (!username && !token) {
          history.push("/login/");
        }
      });
      useEffect(() => {
        axios.get(`${server}/appointment/${token}/`).then((res) => {
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
            <Link style={{ textDecoration: "none", fontWeight: "bold",fontSize:"20px" }}>
              {`Welcome ${username}`}
            </Link>
          </li>
          <li>
            <Link
              to="/book_appointment/"
              style={{
                textDecoration: "none",
                color: "green",
                fontWeight: "bold",
                fontSize:"20px"
              }}
            >
              Book Appointment
            </Link>
          </li>
          <li>
            <Link
              to="/login/"
              onClick={logoutFun}
              style={{
                textDecoration: "none",
                color: "red",
                fontWeight: "bold",
                fontSize:"20px"
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
         Doctor Name: {data.doctor_name}
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

export default PatientHome