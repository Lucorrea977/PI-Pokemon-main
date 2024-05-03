import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchPoke } from "../../redux/actions";
import "./SearchBar.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); 

  const handleInputChange = (e) => {
    setName(e.target.value);
    setError(""); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^[a-zA-Z]+$/.test(name)) {
      setError("Por favor, ingrese un nombre de Pokémon válido.");
      return;
    }

    setIsLoading(true); 

    try {
      await dispatch(searchPoke(name));
    } catch (error) {
      setError("Ocurrió un error al buscar el Pokémon."); 
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div>
      <input
        className="search"
        type="text"
        onChange={(e) => handleInputChange(e)}
        placeholder="Buscar Pokémon..."
      />
      <button className="boton" type="submit" onClick={(e) => handleSubmit(e)} disabled={isLoading}>
        {isLoading ? ( 
          <img src="https://pa1.narvii.com/6371/6a71990a2be0ae0fb7198865207f4f35a91d6400_hq.gif" alt="Cargando..." className="loading" />
        ) : (
          "Buscar"
        )}
      </button>
      
      {error && <p className="error">{error}</p>}
    </div>
  );
}