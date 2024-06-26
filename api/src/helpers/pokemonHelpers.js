const getAllPokemons = require("../controllers/getPokemon");
const { Pokemon, Type} = require("../db");

const getPokemons = async (name) => {
  let pokemonsTotal = await getAllPokemons();
  if (name) {
    const filteredPokemons = pokemonsTotal.filter((element) =>
      element.name.toLowerCase().includes(name.toLowerCase())
    );
    if (filteredPokemons.length === 0) {
      throw new Error("Pokémon no encontrado");
    }
    return filteredPokemons;
  } else {
    return pokemonsTotal;
  }
};



const getPokemonById = async (id) => {
  const pokemonsTotal = await getAllPokemons();
  return pokemonsTotal.filter((elemento) => elemento.id == id);
};

const createPokemon = async (name, image, hp, attack, defense, speed, height, weight, types) => {
  const newPokemon = await Pokemon.create({
    name,
    image,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
  });

  if (!name) {
    throw new Error("El nombre es obligatorio");
  }

  if (Array.isArray(types) && types.length) {
    let dbTypes = await Promise.all(
      types.map((e) => {
        return Type.findOne({ where: { name: e } });
      })
    );
    await newPokemon.setTypes(dbTypes);
  }

  return newPokemon;
};



module.exports = { getPokemons, getPokemonById, createPokemon };