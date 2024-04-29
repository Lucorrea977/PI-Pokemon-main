import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getType, postPokemon } from "../../redux/actions";

import "./Create.css";

function validate(pokemon) {
  let errors = {};

  if (!pokemon.name) {
    errors.name = "Se requiere un nombre";
  } else if (pokemon.name.length < 3 || pokemon.name.length > 50) {
    errors.name = "El nombre debe tener entre 3 y 50 caracteres";
  }

  if (pokemon.hp < 4 || pokemon.hp > 999) {
    errors.hp = "La vida debe ser un número entre 0 y 999";
  }

  if (pokemon.attack < 4 || pokemon.attack > 999) {
    errors.attack = "La fuerza debe ser un número entre 0 y 999";
  }

  if (pokemon.defense < 4 || pokemon.defense > 999) {
    errors.defense = "La defensa debe ser un número entre 0 y 999";
  }

  if (pokemon.speed < 4 || pokemon.speed > 999) {
    errors.speed = "La velocidad debe ser un número entre 0 y 999";
  }

  if (pokemon.height < 4 || pokemon.height > 999) {
    errors.height = "La altura debe ser un número entre 0 y 999";
  }

  if (pokemon.weight < 4 || pokemon.weight > 999) {
    errors.weight = "El peso debe ser un número entre 0 y 999";
  }

  if (pokemon.types.length === 0) {
    errors.types = "Debes seleccionar al menos un tipo";
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

  async function handleGoBack() {
    // Simulamos una carga interna esperando 500ms antes de volver atrás
    await new Promise(resolve => setTimeout(resolve, 500));
    navigate("/home");
  }

  function onSubmit(e) {
    e.preventDefault();

    const formErrors = validate(pokemon);

    if (Object.keys(formErrors).length === 0) {
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
    } else {
      setErrors(formErrors);
    }
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
      />
      {errors.name && <p className="error">{errors.name}</p>}

      <label htmlFor="image"> Imagen: </label>
      <input
        onChange={onInputChange}
        id="image"
        name="image"
        type="text"
        value={pokemon.image}
        className="input"
      />

      <label htmlFor="hp"> Vida: </label>
      <input
        onChange={onInputChange}
        id="hp"
        name="hp"
        type="number"
        value={pokemon.hp}
        className="input"
      />
      {errors.hp && <p className="error">{errors.hp}</p>}

      <label htmlFor="attack"> Fuerza: </label>
      <input
        onChange={onInputChange}
        id="attack"
        name="attack"
        type="number"
        value={pokemon.attack}
        className="input"
      />
      {errors.attack && <p className="error">{errors.attack}</p>}

      <label htmlFor="defense"> Defensa: </label>
      <input
        onChange={onInputChange}
        id="defense"
        name="defense"
        type="number"
        value={pokemon.defense}
        className="input"
      />
      {errors.defense && <p className="error">{errors.defense}</p>}

      <label htmlFor="speed"> Velocidad: </label>
      <input
        onChange={onInputChange}
        id="speed"
        name="speed"
        type="number"
        value={pokemon.speed}
        className="input"
      />
      {errors.speed && <p className="error">{errors.speed}</p>}

      <label htmlFor="height"> Altura: </label>
      <input
        onChange={onInputChange}
        id="height"
        name="height"
        type="number"
        value={pokemon.height}
        className="input"
      />
      {errors.height && <p className="error">{errors.height}</p>}

      <label htmlFor="weight"> Peso: </label>
      <input
        onChange={onInputChange}
        id="weight"
        name="weight"
        type="number"
        value={pokemon.weight}
        className="input"
      />
      {errors.weight && <p className="error">{errors.weight}</p>}

      {types.length > 0 && (
        <div className="types-s">
          <label htmlFor="type-select"> Tipos: </label>
          <select id="type-select" onChange={handleSelect} value="">
            <option value="" disabled>
              Seleccionar tipo
            </option>
            {types.map((type) => (
              <option key={type.name} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>
          {errors.types && <p className="error">{errors.types}</p>}
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
        </div>
      )}

      <div className="button-group">
        <button type="button" className="atras" onClick={handleGoBack}>
          Atrás
        </button>
        <button type="submit" className="bottom">
          Crear
        </button>
      </div>
    </form>
  );
}