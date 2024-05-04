import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions";
import { useParams, useNavigate } from "react-router-dom";
import './Detail.css'

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const details = useSelector((state) => state.detail);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setLoading(true);
      dispatch(getDetail(id)).then(() => setLoading(false));
    }
  }, [dispatch, id]);

  const handleGoBack = () => {
    setLoading(true);
    navigate("/home");
  };

  return (
    <div className="container">
      <div>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="volver">
              <button className="letter volver-btn" onClick={handleGoBack}>
                {" "}
                Volver{" "}
              </button>
            </div>
            {details.map((pokemon) => (
              <PokemonDetail key={pokemon.id} pokemon={pokemon} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

function PokemonDetail({ pokemon }) {
  const { name, id, types, image, hp, attack, defense, speed, height, weight } = pokemon;

  const typesString = types.map((type) => typeof type === 'string' ? type : type.name).join(', ');

  return (
    <div className="cardBox">
      <div className="card">
        <h1 className="names">{name.toUpperCase()}</h1>
        <h2 className="id">#{id}</h2>
        <img className="imagen" src={image} alt={name} />
        <div className="content">
          <ul>
            <li className="lista">Tipos: {typesString}</li>
            <li className="lista">Vida: {hp} Ps</li>
            <li className="lista">Fuerza: {attack} %</li>
            <li className="lista">Defensa: {defense} %</li>
            <li className="lista">Velocidad: {speed} %</li>
            <li className="lista">Altura: {height} Mt</li>
            <li className="lista">Peso: {weight} Kg</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <img
      src="https://pa1.narvii.com/6371/6a71990a2be0ae0fb7198865207f4f35a91d6400_hq.gif"
      alt="Cargando..."
    />
  );
}