import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByType, filterCreated, filterByAttack, Sort, getType } from "../../redux/actions";

function FilterBar() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const types = useSelector((state) => state.types.map((type) => type.name));

  useEffect(() => {
    dispatch(getType());
  }, [dispatch]);

  const handleFilterType = (e) => {
    const { value } = e.target;
    dispatch(filterByType(value));
  };

  const handleFilterCreated = (e) => {
    const { value } = e.target;
    dispatch(filterCreated(value));
    if (value !== "") {
      dispatch(filterByType("")); 
    }
  };

  const handleFilterAttack = (e) => {
    const { value } = e.target;
    dispatch(filterByAttack(value));
  };

  const onSelectsChange = (e) => {
    const { value } = e.target;
    dispatch(Sort(value));
  };

  return (
    <div className="filter-bar">
      <select name="filterType" value={filters.type} onChange={handleFilterType}>
        <option value="">Tipos</option>
        {types.map((type) => (
          <option key={type} value={type}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </option>
        ))}
      </select>
      <select name="filterCreated" value={filters.created} onChange={handleFilterCreated}>
        <option value="">Origen</option>
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