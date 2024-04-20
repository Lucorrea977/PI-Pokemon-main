import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions";
import { Link, useParams } from "react-router-dom";
import './Detail.css';

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // Estado para controlar la carga

  useEffect(() => {
    // Al comenzar la carga de los detalles, establecer loading en true
    setLoading(true);
    dispatch(getDetail(id))
      .then(() => {
        // Cuando los detalles se cargan con éxito, establecer loading en false
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching details:", error);
        setLoading(false); // En caso de error, también establecer loading en false
      });
  }, [dispatch, id]);

  let details = useSelector((state) => state.detail);

  // Si está en curso la carga, mostrar un indicador de carga
  if (loading) {
    return <div className="loadingDetail">Cargando detalles...</div>; // Puedes personalizar este mensaje según tus necesidades
  }

  return (
    <div className="container">
      <div className="volver">
        <Link to="/home" className="letter"> Volver </Link> 
      </div>
      <div>
        {details.length ? (
          details.map((p) => (
            <div key={p.id}>
              <h1 className="names">{p.name.toUpperCase()}</h1>
              <h2 className="id">#{p.id}</h2>
              <div>
                <img className="imagen" src={p.image} alt="" width="250px" height="250px" />
                {p.types.length === 2 ? (
                  <div>
                    <h3 className="type1">
                      <ul className="type">
                        <li>
                          {
                            typeof p.types[0] === 'string' ? p.types[0] : p.types[0]?.name}-
                          {
                            typeof p.types[1] === 'string' ? p.types[1] : p.types[1]?.name}
                        </li>
                      </ul>
                    </h3>
                  </div>
                ) : (
                  <div>
                    <h3 className="type2">{
                      typeof p.types[0] === 'string' ? p.types[0] : p.types[0]?.name}</h3>
                  </div>
                )}

                <div>
                  <h4>
                    <ul>
                      <li className="lista">
                        Vida: {p.life} Ps -
                        Fuerza: {p.attack} % -
                        Defensa: {p.defense} % -
                        Velocidad: {p.speed} % -
                        Altura: {p.height} Mt -
                        Peso: {p.weight} Kg
                      </li>
                    </ul>
                  </h4>
                </div>
              </div>
            </div>
          ))
        ) : (
          <img
            src={"https://static.wixstatic.com/media/20abc5_e58061f333744c2899c375ec7f024eb3~mv2.gif"}
            width="250px" height="300px"
            alt="Not found"
          />
        )}
      </div>
    </div>
  );
}