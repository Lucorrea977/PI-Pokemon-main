import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchPoke } from "../../redux/actions";
import "./SearchBar.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setName(e.target.value);
    setError(""); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!/^[a-zA-Z]+$/.test(name)) {
      setError("Por favor, ingrese un nombre de pokemon válido.");
      return;
    }

    dispatch(searchPoke(name));
  };

  return (
    <div>
      <input
        className="search"
        type="text"
        onChange={(e) => handleInputChange(e)}
        placeholder="Buscar pokemon..."
      />
      <button className="boton" type="submit" onClick={(e) => handleSubmit(e)}>
        Buscar
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}