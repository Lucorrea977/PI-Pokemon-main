const findPokemonById = require("../controllers/findPokemonById");

const getPokemonsbyId = async (req, res) => {
    const { id } = req.params;
    const source = isNaN(id) ? "DB" : "API";
    try {
        const response = await findPokemonById(id, source);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ "error": error.message });
    }
};
module.exports = getPokemonsbyId;