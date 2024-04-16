import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions";
import { Link } from "react-router-dom";
import './Detail.css'

export default function Detail(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, [dispatch]);

  let details = useSelector((state) => state.detail);
  console.log(details)
  return (
    <div className="container">
      <div className="volver">
        <Link to="/home" className="letter"> Volver </Link> </div>
      <div>
        {details.length ? (
          details.map((p) => (
            <Link to={`/home/${p.id}`}>
              <div>
                <h1 className="names">{p.name.toUpperCase()}</h1>
                <h2 className="id">#{p.id}</h2>
              </div>
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
            </Link>
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