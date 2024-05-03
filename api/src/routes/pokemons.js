const { Router } = require("express");
const { getPokemons, getPokemonById, createPokemon } = require("../helpers/pokemonHelpers");

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const name = req.query.name;
    let pokemons = await getPokemons(name);
    res.status(200).send(pokemons);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    let pokemon = await getPokemonById(id);
    pokemon.length
      ? res.status(200).json(pokemon)
      : res.status(404).send("No se encontró el pokemon");
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, image, hp, attack, defense, speed, height, weight, types } = req.body;
    let newPokemon = await createPokemon(name, image, hp, attack, defense, speed, height, weight, types);
    res.status(201).json({ message: "Pokemon creado exitosamente", pokemon: newPokemon });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;