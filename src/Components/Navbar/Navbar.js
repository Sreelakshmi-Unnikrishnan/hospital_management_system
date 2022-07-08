import React from 'react'
import './Navbar.css'
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
        <header className="Navbar">
        <div className="Toolbar">
          <div className="Title"> Hospital Management System </div>
          <div>
          <Link
              to="/doctorlogin/"
              style={{
                textDecoration: "none",
                color: "purple",
                fontWeight: "bold",
                marginRight:"250px",
                fontSize:"20px"
              }}
            >Doctor
            </Link>           
            <Link
              to="/login/"
              style={{
                textDecoration: "none",
                color: "purple",
                fontWeight: "bold",
                marginRight:"150px",
                fontSize:"20px"
              }}
            >
             Patient
            </Link>
          </div>
        </div>
      </header>     
    </div>
  )
}

export default Navbar