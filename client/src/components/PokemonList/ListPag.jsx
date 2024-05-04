import React, { useState } from "react";
import { Link } from "react-router-dom";
import CardPokemon from "../Card/CardPokemon";
import Paginado from "../Paginado/Paginado";

function PokemonList({ pokemons }) {
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 12;
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
  const totalPages = Math.ceil(pokemons.length / pokemonsPerPage);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="pokemon-list">
      {totalPages > 1 && (
        <Paginado pokemonsPerPage={pokemonsPerPage} allPokemons={pokemons.length} paginado={paginado} currentPage={currentPage} />
      )}
      {currentPokemons.map((pokemon) => (
        <Link key={pokemon.id} to={`/home/${pokemon.id}`}>
          <CardPokemon {...pokemon} />
        </Link>
      ))}
    </div>
  );
}

export default PokemonList;