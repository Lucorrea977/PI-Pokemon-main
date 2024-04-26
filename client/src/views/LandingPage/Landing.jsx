import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";

export default function LandingPage() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim() !== "") {

      navigate("/home");
    } else {
      alert("Por favor, ingrese su nombre artistico");
    }
  };

  return (
    <div className="lp">
      <h1 className="title">¡Bienvenidos a Poképedia!</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Crea tu nombre artistico"
            value={name}
            onChange={handleInputChange}
          />
          <button className="button" type="submit">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}  