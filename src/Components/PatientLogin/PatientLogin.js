import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { server } from "../API/Server";
import './PatientLogin.css'
function PatientLogin() {
    const [patient_name, setPatient_name] = useState("");
    const [patient_nameRequired, setPatient_nameRequired] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordRequired, setPasswordRequired] = useState(false);

    const [error, setError] = useState(false);
    const history = useHistory();
    var Patient_name = localStorage.getItem("patient_name");
    var Patient_token = localStorage.getItem("patient_token");
    useEffect(() => {
        if (Patient_name && Patient_token) {
          history.push("/patient/home/");
        }
      });
    
      console.log("name",patient_name)
      console.log("pass",password)

      const loginBtn = () => {
        if (patient_name == "" && password == "") {
        setPatient_nameRequired(true);
          setPasswordRequired(true);
        } else {
          if (patient_name == "") {
            setPatient_nameRequired(true);
          } else {
            setPatient_nameRequired(false);
          }
    
          if (password == "") {
            setPasswordRequired(true);
          } else {
            setPasswordRequired(false);
          }
          if (patient_name != "" && password != "") {
            postData();
          }
        }
       
      };

      function postData() {
        axios
          .post(`${server}/login/patient/`, {
            patient_name,
            password,
          })
          .then((response) =>{
            localStorage.setItem("patient_token",response.data["Token"]);
            console.log("-----",response.data["Token"])
            localStorage.setItem("patient_name",patient_name);
            if (patient_name != "" &&  password !="") {
              history.push("/patient/home/");
            }
            })
        }
    
  return (
    <div>
<div className="login-first-div">
        <div className="login-second-div">
          <h3>Login</h3>
          {error ? <p>Invalid Credentials</p> : null}

          <div className="form1">
            <label>Patient Name</label>
            <input
              className="input"
              type="text"
              required
              placeholder="patient_name"
              value={patient_name}
              onChange={(e) => setPatient_name(e.target.value)}
            />
            {patient_nameRequired ? (
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
            <span>
              Don't have an account? <Link to="/register">Join Now</Link>
            </span>
          </div>
          </div>
          </div>
    </div>
  )
}

export default PatientLogin