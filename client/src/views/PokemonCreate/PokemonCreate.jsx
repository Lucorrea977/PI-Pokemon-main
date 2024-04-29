import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getType, postPokemon } from "../../redux/actions";
import { Link } from "react-router-dom";

import "./Create.css";

function validate(pokemon) {
  let errors = {};
  if (!pokemon.name) {
    errors.name = "Se requiere un nombre";
  }
  return errors;
}

export default function PokemonCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const types = useSelector((state) => state.types);

  const [errors, setErrors] = useState({});
  const [pokemon, setPokemon] = useState({
    name: "",
    types: [],
    image: "",
    attack: 0,
    hp: 0,
    defense: 0,
    speed: 0,
    height: 0,
    weight: 0,
  });

  useEffect(() => {
    dispatch(getType());
  }, [dispatch]);

  useEffect(() => {
    if (types.length === 0) { 
      dispatch(getType());
    }
  }, [dispatch, types]);

  function handleSelect(e) {
    setPokemon({
      ...pokemon,
      types: [...pokemon.types, e.target.value],
    });
  }

  function handleDelete(type) {
    setPokemon({
      ...pokemon,
      types: pokemon.types.filter((t) => t !== type),
    });
  }

  function onInputChange(e) {
    e.preventDefault();
    setPokemon({
      ...pokemon,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...pokemon,
        [e.target.name]: e.target.value,
      })
    );
  }

  function onSubmit(e) {
    e.preventDefault();

    dispatch(postPokemon(pokemon));
    alert("Personaje creado con éxito");
    setPokemon({
      name: "",
      types: [],
      image: "",
      attack: 0,
      defense: 0,
      hp: 0,
      speed: 0,
      height: 0,
      weight: 0,
    });
    navigate("/home");
  }


  return (
    <form className="form" onSubmit={onSubmit}>
      <h3 className="title"> ¡Crea tu pokemon!</h3>

      <label htmlFor="name"> Nombre: </label>
      <input
        onChange={onInputChange}
        id="name"
        name="name"
        type="text"
        value={pokemon.name}
        required
        className="input"
      />{" "}
      {errors.name && <p className="error"> {errors.name}</p>}

      <label htmlFor="">Imagen: </label>
      <input
        onChange={onInputChange}
        name="image"
        type="text"
        value={pokemon.image}
        className="input"
      />{" "}

      <label htmlFor="">Vida: </label>
      <input
        onChange={onInputChange}
        name="hp"
        type="number"
        value={pokemon.hp}
        className="input"
      />{" "}

      <label htmlFor="">Fuerza: </label>
      <input
        onChange={onInputChange}
        name="attack"
        type="number"
        value={pokemon.attack}
        className="input"
      />{" "}

      <label htmlFor="">Defensa: </label>
      <input
        onChange={onInputChange}
        name="defense"
        type="number"
        value={pokemon.defense}
        className="input"
      />{" "}

      <label htmlFor="">Velocidad: </label>
      <input
        onChange={onInputChange}
        name="speed"
        type="number"
        value={pokemon.speed}
        className="input"
      />{" "}

      <label htmlFor="">Altura: </label>
      <input
        onChange={onInputChange}
        name="height"
        type="number"
        value={pokemon.height}
        className="input"
      />{" "}

      <label htmlFor="">Peso: </label>
      <input
        onChange={onInputChange}
        name="weight"
        type="number"
        value={pokemon.weight}
        className="input"
      />{" "}

      {types.length > 0 && ( 
        <p className="types-s">
          <select onChange={handleSelect}>
            {types.map((e) => (
              <option value={e.name}>{e.name}</option>
            ))}{" "}
          </select>
          <ul>
            {pokemon.types.map((type) => (
              <li key={type}>
                {type}
                <button type="button" onClick={() => handleDelete(type)}>
                  x
                </button>
              </li>
            ))}
          </ul>
        </p>
      )}

      <Link to="/home">
        <button type="submit" className="atras">
          Atrás
        </button>
      </Link>
      <button type="submit" className="bottom">
        Crear
      </button>
    </form>
  );
}