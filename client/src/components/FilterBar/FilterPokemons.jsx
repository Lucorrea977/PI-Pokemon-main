const FilterPokemons = (allPokemons, filters) => {
  let filtered = [...allPokemons];

  if (filters.type) {
    const pokemonNormal = filtered.filter(pokemon => pokemon.types.includes(filters.type));
    const pokemonsName =  filtered.filter(pokemon => {
      return pokemon.types.some(type => type.name === filters.type);
    });
    filtered = [...pokemonNormal,...pokemonsName]
  }
  if (filters.created === "Creados") {
    filtered = filtered.filter(pokemon => pokemon.id.length > 2);
  } else if (filters.created === "Existentes") {
    filtered = filtered.filter(pokemon => pokemon.id <= 40);
  }
  if (filters.attack === "Mayor fuerza") {
    filtered = filtered.sort((a, b) => b.attack - a.attack);
  } else if (filters.attack === "Menor fuerza") {
    filtered = filtered.sort((a, b) => a.attack - b.attack);
  }
  if (filters.sort === "ASCENDENTE") {
    filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (filters.sort === "DESCENDENTE") {
    filtered = filtered.sort((a, b) => b.name.localeCompare(a.name));
  }

  return filtered;
};

export default FilterPokemons; 