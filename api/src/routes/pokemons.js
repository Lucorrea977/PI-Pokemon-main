const { Router } = require("express");
const getAllPokemons = require("../controllers/getPokemon");
const router = Router();
const { Pokemon, Type } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    let name = req.query.name; 
    let pokemonsTotal = await getAllPokemons();
    if (name) {
      let pokemonName = await pokemonsTotal.filter((el) =>
        el.name.toLowerCase().includes(name.toLowerCase())
      );
      pokemonName.length
        ? res.status(200).send(pokemonName) 
        : res.status(404).send("El pokemon ingresado no existe"); 
    } else {
      res.status(200).send(pokemonsTotal); 
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => { 
  try {
    const id = req.params.id;
    const pokemonsTotal = await getAllPokemons();
    if (id) { 
      let pokemonId = pokemonsTotal.filter((el) => el.id == id);
      pokemonId.length
        ? res.status(200).json(pokemonId)
        : res.status(404).send("No se encontró el pokemon");
    }
  } catch (error) {
    next(error);
  }
});



router.post("/", async (req, res, next) => {
  try {
    let { name, image, hp, attack, defense, speed, height, weight, types } = req.body 

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

    if (!name) return res.status(400).json({ error: "El nombre es obligatorio" });

    if (Array.isArray(types) && types.length) { 
      let dbTypes = await Promise.all( 
        types.map((e) => { 
          return Type.findOne({ where: { name: e } })
        })
      )
      await newPokemon.setTypes(dbTypes) 
    }

    return res.status(201).json({ message: "Pokemon creado exitosamente", pokemon: newPokemon });
  } catch (err) {
    return res.status(500).json({ error: "Error interno del servidor" });
  }
})

module.exports = router;



