import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { server } from "../API/Server";
import './PatientRegister.css'

function PatientRegister() {
    var history = useHistory();

    const [patient_name, setPatient_name] = useState("");
    const [patient_nameRequired, setPatient_nameRequired] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordRequired, setPasswordRequired] = useState(false);
    const [passwordMinLength, setPasswordMinLength] = useState(false);
    const [address, setAddress] = useState("");
    const [mobile, setMobile] = useState("");
    const [medical_history, setMedical_history] = useState("");
    const [token, setToken] = useState("hgghgjhkjhj");
    const [error, setError] = useState(false);

    const registerBtn = () => {
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
          if (password.length < 4) {
            setPasswordRequired(false);
            setPasswordMinLength(true);
          } else {
            setPasswordRequired(false);
            setPasswordMinLength(false);
          }
        }
        if (
          patient_name != "" &&
          password != "" &&
          password.length > 4
        ) {
          console.log("working 001 ---");
          createUserFunc();
        }
      }
    };

    function createUserFunc() {
        axios
          .post(`${server}/register/patient/`, {
            patient_name: patient_name,
            password: password,
            address: address,
            mobile: mobile,
            medical_history: medical_history
          })
          .then((res) => {
            console.log("posting data", res.data);
             if (res.data["patient_token"]) {
                 localStorage.setItem("patient_token", res.data["patient_token"]);
                 localStorage.setItem("patient_name", patient_name);
                 history.push("/login/");
               } else {
                 setError(true);
               }
            });
          }
           

  return (
    <div>
         <div className="body">
          <div className="container">
          <h3>Register</h3>
          {error ? <p className="text-danger">User already exist!</p> : null}
          <div className="form">
            <label>Patient Name</label>
            <input
              type="text"
              placeholder="Patientname"
              value={patient_name}
              onChange={(e) => setPatient_name(e.target.value)}
            />
            {patient_nameRequired ? (
              <span className="text-dange
              r">This field is required</span>
            ) : null}
             <label>password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {passwordRequired ? (
              <span className="text-danger">This field is required</span>
            ) : null}
            {passwordMinLength ? (
              <span className="text-danger">Min length 4!</span>
            ) : null}
            <label>Address</label>
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <label>Mobile Number</label>
            <input
              type="text"
              required
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            <label>Medical History</label>
            <input
              type="text"
              placeholder="Medical History"
              value={medical_history}
              onChange={(e) => setMedical_history(e.target.value)}
            />
            <input
              className="submit"
              type="submit"
              value="Register"
              onClick={registerBtn}
            />
            <span>
              Have an account? <Link to="/login/">Login</Link>
            </span>
          </div>
        </div>
        </div>
    </div>
  )
}

export default PatientRegister