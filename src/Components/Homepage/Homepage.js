import React from 'react'
import hosp from "../Images/hosp.jpg";
import Navbar from '../Navbar/Navbar';
import './Homepage.css'
function Homepage() {
  return (
    <div>
      <Navbar/>
    <img src={hosp} alt="" className="banner-img"/>
    </div>
  )
}

export default Homepage