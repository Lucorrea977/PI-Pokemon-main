const cleanPokemonApi = (arr) =>
    arr.map((pokemon) => {
        return {
            id: pokemon.id,
            name: pokemon.name,
            image: pokemon.sprites.other.dream_world.front_default,
            hp: pokemon.stats[0].base_stat,
            attack: pokemon.stats[1].base_stat,
            defense: pokemon.stats[2].base_stat,
            speed: pokemon.stats[5].base_stat,
            height: pokemon.height,
            weight: pokemon.weight,
            types: pokemon.types ? pokemon.types.map((elem) => elem.type.name).flat().sort().join(', ') : undefined,
            createInDb: false,
        };
    })


module.exports = cleanPokemonApi;