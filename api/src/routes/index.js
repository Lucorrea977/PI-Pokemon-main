

const { Router } = require('express');
const pokemonsRoute = require('./pokemons')
const typesRoute = require('./types')
const router = Router();

router.use('/pokemons', pokemonsRoute);
router.use('/types', typesRoute);



module.exports = router;