import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../../redux/actions";
import NavBar from "../../components/NavBar/NavBar";
import SearchBar from "../../components/SearchBar/SearchBar";
import FilterBar from "../../components/FilterBar/FilterBar";
import PokemonList from "../../components/PokemonList/ListPag";
import FilterPokemons from "../../components/FilterBar/FilterPokemons";
import "./Home.css";

function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);
  const filters = useSelector((state) => state.filters);
  const [isLoading, setIsLoading] = useState(false); 

  useEffect(() => {
    setIsLoading(true); 
    dispatch(getPokemons()).then(() => {
      setIsLoading(false); 
    });
  }, [dispatch]);

  const filteredPokemons = FilterPokemons(allPokemons, filters);

  const handleReloadPage = () => {
    setIsLoading(true); 
    window.location.reload(); 
  };


  return (
    <>
      <NavBar />
      <SearchBar />
      <FilterBar />
      <div className="reload-button-container">
        <button className="reload-button" onClick={handleReloadPage}>
          Actualizar ⟳
        </button>
      </div>
      {isLoading ? ( 
        <div className="loading-indicator">Cargando...</div>
      ) : (
        <PokemonList pokemons={filteredPokemons} />
      )}
    </>
  );
}

export default Home;