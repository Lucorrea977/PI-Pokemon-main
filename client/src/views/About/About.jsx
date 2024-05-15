import React from "react";
import { Link } from "react-router-dom";
import githubLogo from "../About/Logos/github.png";
import linkedinLogo from "../About/Logos/linkedin.png";
import instagramLogo from "../About/Logos/instagram.png";
import pok from "../About/Logos/pok.gif"; 
import "./About.css";


export default function About() {
  return (
    <div className="about-container">

      <h2 className="about-header">Acerca de la web</h2>
      <p className="about-content">Bienvenido a "Poképedia". Mi nombre es Luana Correa y soy la creadora de esta web.</p>
      <p className="about-content">Poképedia es una herramienta diseñada para los amantes de los Pokémon, donde puedes explorar información detallada sobre cada criatura, así como también interactuar para crear tus propios Pokémon personalizados.</p>
      <p className="about-content">El objetivo es proporcionarte una experiencia interactiva y educativa sobre el fascinante mundo de los Pokémon.</p>
      <img src={pok} alt="Pokémon" className="pok-gif" />

      <div className="about-buttons">
        <Link to="/home">
          <button> volver </button>
        </Link>
      </div>


      <div className="about-social">

        <ul>
          <li><a href="https://github.com/Lucorrea977" target="_blank" rel="noopener noreferrer"><img src={githubLogo} alt="GitHub" /></a></li>
          <li><a href="https://www.linkedin.com/in/luana-camila-correa-0b662616a/" target="_blank" rel="noopener noreferrer"><img src={linkedinLogo} alt="LinkedIn" /></a></li>
          <li><a href="https://www.instagram.com/luannn.na1" target="_blank" rel="noopener noreferrer"><img src={instagramLogo} alt="Instagram" /></a></li>
        </ul>
      </div>
    </div>
  )}