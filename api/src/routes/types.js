const axios = require("axios");
const { Router } = require("express");
const { Type } = require("../db.js");

const router = Router();
router.get("/", async (_req, res, next) => {
  try {
    
    const apiTypes = await axios.get("https://pokeapi.co/api/v2/type");
    const types = apiTypes.data.results;

    
    const existingTypeNames = new Set();
    for (const type of types) {
      const find = await Type.findOne({ where: {name: type.name}});
      if (find) {
        existingTypeNames.add(type.name);
      } else {
        await Type.create({ name: type.name });
      }
    }

    
    const allTypes = await Type.findAll();
    const typesToReturn = allTypes.filter((type) => existingTypeNames.has(type.name));
    res.status(200).json(typesToReturn);
  } catch (error) {
    next(error);
  }
});



module.exports = router;