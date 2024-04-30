import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../../redux/actions";
import NavBar from "../../components/NavBar/NavBar";
import SearchBar from "../../components/SearchBar/SearchBar";
import FilterBar from "../../components/FilterBar/FilterBar";
import PokemonList from "../../components/PokemonList/List";
import "./Home.css";

function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);

  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch])

  return (
    <>
      <NavBar />
      <SearchBar />
      <FilterBar />
      <PokemonList pokemons={allPokemons} />
    </>
  );
}

export default Home