import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterPokemonsByType, filterCreated, filterByAttack, Sort } from "../../redux/actions";

function FilterBar() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  const handleFilterType = (e) => {
    const { value } = e.target;
    dispatch(filterPokemonsByType(value));
  };

  const handleFilterCreated = (e) => {
    const { value } = e.target;
    dispatch(filterCreated(value));
  };

  const handleFilterAttack = (e) => {
    const { value } = e.target;
    dispatch(filterByAttack(value));
  };

  const onSelectsChange = (e) => {
    const { value } = e.target;
    dispatch(Sort(value));
  };

  const pokemonTypes = [
    "normal", "flying", "poison", "ground", "bug",
    "fire", "water", "grass", "electric", "fairy"
  ];

  return (
    <div className="filter-bar">
      <select name="filterType" value={filters.type} onChange={handleFilterType}>
        <option value="">Tipos</option>
        {pokemonTypes.map((type) => (
          <option key={type} value={type}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </option>
        ))}
      </select>
      <select name="filterCreated" value={filters.created} onChange={handleFilterCreated}>
        <option value="">Creados</option>
        <option value="Creados">Creados</option>
        <option value="Existentes">Existentes</option>
      </select>
      <select name="filterAttack" value={filters.attack} onChange={handleFilterAttack}>
        <option value="">Fuerza</option>
        <option value="Mayor fuerza">Mayor fuerza</option>
        <option value="Menor fuerza">Menor fuerza</option>
      </select>
      <select name="sort" value={filters.sort} onChange={onSelectsChange}>
        <option value="">Ordenar A-Z</option>
        <option value="ASCENDENTE">Ascendente</option>
        <option value="DESCENDENTE">Descendente</option>
      </select>
    </div>
  );
}

export default FilterBar;