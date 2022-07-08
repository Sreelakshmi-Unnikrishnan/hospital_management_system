import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { server } from "../API/Server";
import './DoctorLogin.css'

function DoctorLogin() {
    const [doctor_name, setDoctor_name] = useState("");
    const [doctor_nameRequired, setDoctor_nameRequired] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordRequired, setPasswordRequired] = useState(false);

    const [error, setError] = useState(false);
    const history = useHistory();
    // var Doctor_name = localStorage.getItem("doctor_name");
    // var Doctor_token = localStorage.getItem("doctor_token");
    // useEffect(() => {
    //     if (Doctor_name && Doctor_token) {
    //       history.push("/doctor/home");
    //     }
    //   });
    
      console.log("name",doctor_name)
      console.log("pass",password)
    
      const loginBtn = () => {
        if (doctor_name == "" && password == "") {
        setDoctor_nameRequired(true);
          setPasswordRequired(true);
        } else {
          if (doctor_name == "") {
            setDoctor_nameRequired(true);
          } else {
            setDoctor_nameRequired(false);
          }
    
          if (password == "") {
            setPasswordRequired(true);
          } else {
            setPasswordRequired(false);
          }
          if (doctor_name != "" && password != "") {
            postData();
          }
        }
       
      };

      function postData() {
        axios.get(`${server}/login/doctor/${doctor_name}/${password}/`)
          .then((response) =>{
            localStorage.setItem("doctor_token",response.data["Token"]);
            console.log("-----",response.data["Token"])
            localStorage.setItem("doctor_name",doctor_name);
            
            history.push("/doctor/home");
    })}
    
  return (
    <div>
<div className="login-first-div">
        <div className="login-second-div">
          <h3>Login</h3>
          {error ? <p>Invalid Credentials</p> : null}

          <div className="form1">
            <label>Doctor Name</label>
            <input
              className="input"
              type="text"
              required
              placeholder="doctor_name"
              value={doctor_name}
              onChange={(e) => setDoctor_name(e.target.value)}
            />
            {doctor_nameRequired ? (
              <span className="text-danger">This field is required</span>
            ) : null}

            <label>Password</label>
            <input
              type="password"
              required
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordRequired ? (
              <span className="text-danger">This field is required</span>
            ) : null}
            <input
              className="submit"
              type="submit"
              value="Login"
              onClick={loginBtn}
            />
          </div>
          </div>
          </div>
    </div>
  )
}

export default DoctorLogin