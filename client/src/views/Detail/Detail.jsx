import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions";
import { Link, useParams } from "react-router-dom";
import './Detail.css'

export default function Detail() {
  const { id } = useParams(); // Obtener el parámetro de la ruta
  const dispatch = useDispatch();
  const details = useSelector((state) => state.detail);
  const [loading, setLoading] = useState(true); // Estado local para controlar la carga

  useEffect(() => {
    // Verificar que id no sea undefined antes de despachar la acción
    if (id) {
      setLoading(true); // Iniciar la carga
      dispatch(getDetail(id)).then(() => setLoading(false)); // Cuando se complete la carga, detenerla
    }
  }, [dispatch, id]);

  return (
    <div className="container">
      <div className="volver">
        <Link to="/home" className="letter">
          {" "}
          Volver{" "}
        </Link>
      </div>
      <div>
        {loading ? ( // Mostrar spinner de carga mientras se está cargando
          <LoadingSpinner />
        ) : (
          details.map((pokemon) => (
            <PokemonDetail key={pokemon.id} pokemon={pokemon} />
          ))
        )}
      </div>
    </div>
  );
}

function PokemonDetail({ pokemon }) {
  const { name, id, types, image, hp, attack, defense, speed, height, weight } = pokemon;

  return (
    <div>
      <h1 className="names">{name.toUpperCase()}</h1>
      <h2 className="id">#{id}</h2>
      <div>
        <img className="imagen" src={image} alt={name} width="250px" height="250px" />
        <div>
          <h3 className="type">
            <ul>
              {types.map((type, index) => (
                <li key={index}>
                  {typeof type === 'string' ? type : type.name}
                </li>
              ))}
            </ul>
          </h3>
        </div>
        <div>
          <h4>
            <ul>
              <li className="lista">
                Vida: {hp} Ps | Fuerza: {attack} % | Defensa: {defense} % | Velocidad: {speed} % | Altura: {height} Mt | Peso: {weight} Kg
              </li>
            </ul>
          </h4>
        </div>
      </div>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <img
      src="https://i.pinimg.com/originals/ea/b7/e1/eab7e1120c9dd628d3bb39a20a94927d.gif"
      alt="Cargando..."
    />
  );
}