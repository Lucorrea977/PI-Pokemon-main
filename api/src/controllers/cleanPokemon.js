const cleanPokemon =(arr) => 
  arr.map((pokemon) => {
    return {
      id: pokemon.data.id,
      name: pokemon.data.name,
      image: pokemon.data.sprites.other.dream_world.front_default,
      hp: pokemon.data.stats[0].base_stat,
      attack: pokemon.data.stats[1].base_stat,
      defense: pokemon.data.stats[2].base_stat,
      speed: pokemon.data.stats[5].base_stat,
      height: pokemon.data.height,
      weight: pokemon.data.weight,
      types: pokemon.data.types.map((elem) => elem.type.name).flat().sort().join(", "),
      createInDb: false,
    };
  });



module.exports = cleanPokemon;