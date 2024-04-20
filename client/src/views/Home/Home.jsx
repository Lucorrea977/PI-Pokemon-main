import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, filterPokemonsByType, filterCreated, Sort, filterByAttack } from "../../redux/actions";
import { Link } from "react-router-dom";
import CardPokemon from "../../components/Card/CardPokemon";
import Paginado from "../../components/Paginado/Paginado";
import NavBar from "../../components/NavBar/NavBar";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./Home.css";

function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 12;
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  const handleFilterType = (e) => {
    dispatch(filterPokemonsByType(e.target.value));
  };

  const handleFilterCreated = (e) => {
    dispatch(filterCreated(e.target.value));
  };

  const handleFilterAttack = (e) => {
    dispatch(filterByAttack(e.target.value));
  };

  const onSelectsChange = (e) => {
    dispatch(Sort(e.target.value));
  };

  // Define una lista de tipos de Pokémon
  const pokemonTypes = [
    "normal", "flying", "poison", "ground", "bug",
    "fire", "water", "grass", "electric", "fairy"
  ];

  return (
    <>
      <NavBar />
      <SearchBar className="search"/>
      <div className="home">
        <div>
          <select name="select" onChange={onSelectsChange} className="a-z">
            <option value="Filtro"> Ordenar A-Z:</option>
            <option value="ASCENDENTE">Ascendente</option>
            <option value="DESCENDENTE">Descendente</option>
          </select>
          <select name="selects" onChange={handleFilterAttack} className="attack">
            <option value="Fuerza"> Ordenar por fuerza</option>
            <option value="Mayor fuerza">Mayor fuerza</option>
            <option value="Menor fuerza">Menor fuerza</option>
          </select>
          <select onChange={handleFilterType}>
            <option value="type"> Filtrar por tipo</option>
            {pokemonTypes.map(type => (
              <option key={type} value={type}>{type[0].toUpperCase() + type.slice(1)}</option>
            ))}
          </select>
          <select onChange={handleFilterCreated}>
            <option value="Todos"> Todos </option>
            <option value="Creados"> Creados </option>
            <option value="Existentes"> Existentes </option>
          </select>
          <Paginado pokemonsPerPage={pokemonsPerPage} allPokemons={allPokemons.length} paginado={paginado} />
          {currentPokemons.map((e) => (
            <Link key={e.id} to={"/home/" + e.id}>
              <CardPokemon name={e.name} image={e.image} types={e.types} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;