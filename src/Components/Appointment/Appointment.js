import React, { useState, useEffect } from "react";
import axios from "axios";
import { server } from "../API/Server";
import {useHistory,useParams } from "react-router-dom";

function Appointment() {
    const [patient_name, setPatient_name] = useState("");
    const [doctor_name, setDoctor_name] = useState("");
    const [date, setDate] = useState("");
    const [symptoms, setSymptoms] = useState("");
    const [module, setModule] = useState([]);
    const history = useHistory();
    var username = localStorage.getItem("patient_name");
    const [error, setError] = useState("doctor is not available");

    const handleSubmit = () => {
        axios
          .post(`${server}/add_appointment/`, {
            patient_name: patient_name,
            doctor_name: doctor_name,
            appointmentDate: date,
            symptoms: symptoms
          })
          .then((response) => {
            setModule(response.data);
            console.log("-hh---", response.data);
            history.push("/patient/home/");
          })
      .catch((error) => {
            alert('doctor is not available')
            console.log("error", error);
          });
          alert('appointment have been added!');
    }
  return (
    <div>
 <h1 style={{marginTop:"80px"}}>Appointment Booking</h1>
        <div className="body">
        <div className="container">
          <div className="form">
            <label>Patient Name</label>
            <input
              type="text"
              placeholder="patient_name"
              value={patient_name}
              onChange={(e) => setPatient_name(`${username}`)}
            />
            <label>Doctor Name</label>
            <input
              type="text"
              placeholder="doctor_name"
              value={doctor_name}
              onChange={(e) => setDoctor_name(e.target.value)}
              required
            />
            {/* <label>Doctor Name</label>
             <select style={{height:"50px", borderRadius:"12px",borderColor:"rgb(143, 13, 13)"}} onChange={(e) => setDoctor_name(e.target.value)}> 
                <option value="⬇️ Select a doctor ⬇️"></option>
                {/* Mapping through each fruit object in our fruits array
          and returning an option element with the appropriate attributes / values.
            */} 
             {/* {data.map((data) => {return(<option>{data.doctor_name}</option>)})}
             <option>{data.doctor_name}</option> 
             </select>  */}
            <label>Appointment Date</label>
            <input
              type="date"
              placeholder="appointment date"
                value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <label>Symptoms</label>
            <input
              type="text"
              placeholder="symptoms"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              required
            />
            <input
              className="submit"
              type="submit"
              value="Submit"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Appointment