import React from "react";
import "./Paginado.css";

export default function Paginado({ pokemonsPerPage, allPokemons, paginado, currentPage }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='paginado'>
        {pageNumbers.map(number => (
          <li className={`number ${currentPage === number ? 'active' : ''}`} key={number}>
            <button className="btn" onClick={() => paginado(number)}>
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}