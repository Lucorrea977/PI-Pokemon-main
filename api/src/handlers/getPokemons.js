const findByName = require("../controllers/findByName");
const findAllPokemons = require("../controllers/findAllPokemons");

const getPokemons = async (req, res) => {
  const { name } = req.query;

  try {
    const response = name ? await findByName(name) : await findAllPokemons();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ "error": error.message });
  }
};

module.exports = getPokemons;