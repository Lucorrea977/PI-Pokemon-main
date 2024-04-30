import React, { useEffect } from "react";
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
  const filters = useSelector((state) => state.filters);

  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  const filteredPokemons = () => {
    let filtered = [...allPokemons];

    if (filters.type) {
      filtered = filtered.filter(pokemon => pokemon.types.includes(filters.type));
    }
    if (filters.created === "Creados") {
      filtered = filtered.filter(pokemon => pokemon.id.length > 2);
    } else if (filters.created === "Existentes") {
      filtered = filtered.filter(pokemon => pokemon.id <= 40);
    }
    if (filters.attack === "Mayor fuerza") {
      filtered = filtered.sort((a, b) => b.attack - a.attack);
    } else if (filters.attack === "Menor fuerza") {
      filtered = filtered.sort((a, b) => a.attack - b.attack);
    }
    if (filters.sort === "ASCENDENTE") {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filters.sort === "DESCENDENTE") {
      filtered = filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    return filtered;
  };

  return (
    <>
      <NavBar />
      <SearchBar />
      <FilterBar />
      <PokemonList pokemons={filteredPokemons()} />
    </>
  );
}

export default Home;