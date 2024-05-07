import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";

export default function LandingPage() {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name !== "") {
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
        navigate("/home");
      }, 2000);
    } else {
      alert("Por favor, ingrese un nombre");
    }
  };

  return (
    <div className="lp">
      <h1 className="title">¡Bienvenidos a Poképedia!</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="ingresar nombre"
            value={name}
            onChange={handleInputChange}
          />
          <button className="button" type="submit" disabled={isLoading}>
            {isLoading ? (
              <img
                src="https://pa1.narvii.com/6371/6a71990a2be0ae0fb7198865207f4f35a91d6400_hq.gif"
                alt="Cargando..."
                className="loading"
              />
            ) : (
              "Ingresar"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}