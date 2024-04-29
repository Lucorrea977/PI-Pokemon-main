import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  return (
    <header id="navegador" className="header">
      <Link to="/">
        <img className="logo" src="https://i.imgur.com/avg4dfp.png" alt="404" />
      </Link>
      <div>
        <Link to="/create" className="created">
           Crear pokemon
        </Link>
        <Link to="/about" className="about">
          Informacion 
        </Link>
      </div>
    </header>
  );
}