const { Pokemon, Type } = require("../db");
const axios = require("axios");
const cleanPokemon = require("./cleanPokemon");

const findAllPokemons = async () => {
    const pokemonsAllDB = await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ["name"],
            as: 'types'
        }
    })

    const pokemonsDB = pokemonsAllDB.map((pokemon) => ({
        ...pokemon.toJSON(),
        types: pokemon.types.map((type) => type.name).flat().sort().join(', ')
    }))

    const apiUrl = (await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=100`))
    const response = apiUrl.data.results?.map(e => axios.get(e.url))

    const responseAPI = await axios.all(response)
    const apiPokemons = cleanPokemon(responseAPI)


    return [...pokemonsDB, ...apiPokemons];
};

module.exports = findAllPokemons;