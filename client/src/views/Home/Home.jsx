import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../../redux/actions";
import NavBar from "../../components/NavBar/NavBar";
import SearchBar from "../../components/SearchBar/SearchBar";
import FilterBar from "../../components/FilterBar/FilterBar";
import PokemonList from "../../components/PokemonList/List";
import FilterPokemons from "../../components/FilterBar/FilterPokemons";
import "./Home.css";

function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);
  const filters = useSelector((state) => state.filters);

  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  const filteredPokemons = FilterPokemons(allPokemons, filters); 

  return (
    <>
      <NavBar />
      <SearchBar />
      <FilterBar />
      <PokemonList pokemons={filteredPokemons} />
    </>
  );
}

export default Home;