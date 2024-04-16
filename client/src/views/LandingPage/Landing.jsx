import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css"



export default function LandingPage() {
  return (
    <div className="lp">
        <img src="/pika.jpg" alt="" />
      <div>
        </div>
        <Link to="/home">
          <button className="button"> INGRESAR </button>
        </Link>
</div>
 
  )
}