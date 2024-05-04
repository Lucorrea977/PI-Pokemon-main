import React from "react";
import "./Card.css";

export default function CardPokemon({ name, types, image, attack }) {
  return (
    <div className="stylesCard">
      <h3 className="name"> {name.charAt(0).toUpperCase() + name.slice(1)}</h3>
      <p className="attack"> 💪 {attack}</p>
      <img src={image} alt="imagen" className="img" width="140px" height="110px"/>
      <ul className="typeStyle">
        {types.map((type, index) => (
          <li key={index} className="type">
            {typeof type === 'string' ? 
              type.charAt(0).toUpperCase() + type.slice(1) :
              (type.name.charAt(0).toUpperCase() + type.name.slice(1))
            }
          </li>
        ))}
      </ul>
    </div>
  );
}