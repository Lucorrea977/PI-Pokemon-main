const { Router } = require('express');

const getPokemons = require('../handlers/getPokemons')
const getPokemonsbyId = require('../handlers/getPokemonsbyId')
const getTypes = require('../handlers/getTypes')
const postNewPokemon = require('../handlers/postNewPokemon')



const router = Router();



router.get('/pokemons', getPokemons);

router.get('/pokemons/:id', getPokemonsbyId);

router.post('/pokemons', postNewPokemon);

router.get('/types', getTypes)



module.exports = router;