import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import hosp from "../Images/hosp.jpg";
import './DoctoHome.css'
// import axios from "axios";
// import { server } from "../API/Server";

function DoctorHome() {
    var username = localStorage.getItem("doctor_name");
    var token = localStorage.getItem("doctor_token");
    var id = localStorage.getItem("id");
    var history = useHistory();

    function logoutFun() {
        localStorage.removeItem("doctor_name");
        localStorage.removeItem("doctor_token");
        localStorage.removeItem("id");
        history.push("/doctorlogin/");
      }
    
      // useEffect(() => {
      //   if (!username && !token) {
      //     history.push("/doctor/");
      //   }
      // });

  return (
    <div>
        <nav>
        <ul className="links">
          <li className="links-li"></li>
          <li>
            <Link style={{ textDecoration: "none", fontWeight: "bold", fontSize:"20px" }}>
              {`Welcome ${username}`}
            </Link>
          </li>
          <li>
            <Link
              to="/appointments/"
              style={{
                textDecoration: "none",
                color: "green",
                fontWeight: "bold",
                fontSize:"20px"
              }}
            >
            Appointments
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
                fontSize:"20px",
              
              }}
            >
              Logout
            </Link>
          </li>
        </ul>
      </nav>
      <img src={hosp} alt="" className="banner-img"/>
    </div>
  )
}

export default DoctorHome