import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemons,
  filterPokemonsByType,
  filterCreated,
  Sort,
  filterByAttack,
} from "../../redux/actions";
import { Link } from "react-router-dom";
import CardPokemon from "../../components/Card/CardPokemon";
import Paginado from "../../components/Paginado/Paginado";
import NavBar from "../../components/NavBar/NavBar";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./Home.css";

function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons) //
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(12);
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = allPokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  function handleFilterType(e) {
    dispatch(filterPokemonsByType(e.target.value));
  }

  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
  }

  function handleFilterAttack(e) {
    dispatch(filterByAttack(e.target.value));
  }

  function onSelectsChange(e) {
    dispatch(Sort(e.target.value));
  }

  return (
    <>
      <NavBar />
      <SearchBar className="search"/>
      <div className="home">
        <div>
          <select name="select" onChange={onSelectsChange} className="a-z">
            <option value="Filtro"> A-Z:</option>
            <option value="ASCENDENTE">Ascendente</option>
            <option value="DESCENDENTE">Descendente</option>
          </select>
          <select
            name="selects"
            onChange={handleFilterAttack}
            className="attack"
          >
            <option value="Fuerza"> Fuerza </option>
            <option value="Mayor fuerza">Mayor fuerza</option>
            <option value="Menor fuerza">Menor fuerza</option>
          </select>
          <select onChange={handleFilterType}>
            <option value="type"> Tipo </option>
            <option value="normal"> Normal </option>
            <option value="flying"> Flying </option>
            <option value="poison"> Poison </option>
            <option value="ground"> Ground </option>
            <option value="bug"> Bug </option>
            <option value="fire"> Fire </option>
            <option value="water"> Water </option>
            <option value="grass"> Grass </option>
            <option value="electric"> Electric </option>
            <option value="fairy"> Fairy </option>
          </select>
          <select onChange={handleFilterCreated}>
            <option value="Todos"> Todos </option>
            <option value="Creados"> Creados </option>
            <option value="Existentes"> Existentes </option>
          </select>
          <Paginado
            pokemonsPerPage={pokemonsPerPage}
            allPokemons={allPokemons.length}
            paginado={paginado}
          />
          {currentPokemons?.map((e) => {
              return (
                <fragment>
                  <Link to={"/home/" + e.id}>
                    <CardPokemon
                      name={e.name}
                      image={e.image}
                      types={e.types}
                    />
                  </Link>
                </fragment>
              );
            })} 
        </div>
      </div>
    </>
  );
}

export default Home;