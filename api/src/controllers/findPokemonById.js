const axios = require("axios");
const { Pokemon, Type } = require("../db");
const cleanPokemonApi = require("../helpers/cleanPokemonApi");

const findPokemonById = async (id, source) => {
    if (source === "DB") {
        const pokemonDB = await Pokemon.findByPk(id, {
            include: {
                model: Type,
                attributes: ["name"],
                as: "types",
            }
        })
        const pokemonIdDb = {
            ...pokemonDB.toJSON(),
            types: pokemonDB.types.map((type) => type.name).flat().sort().join(', ')
        };
        return [pokemonIdDb];

    }

    if (source === "API") {
        const pokemonApi = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)).data
        const cleaninfo = cleanPokemonApi([pokemonApi]);
        return cleaninfo;
    }
};

module.exports = findPokemonById;