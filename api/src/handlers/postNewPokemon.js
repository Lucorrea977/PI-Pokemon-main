const createPokemon = require("../controllers/createPokemon");

const postNewPokemon = async (req, res) => {
    const { id, name, image, hp, attack, defense, speed, height, weight, typeOne, typeTwo } = req.body;

    try {

        const response = await createPokemon(id, name, image, hp, attack, defense, speed, height, weight, typeOne, typeTwo);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ "error": error.message });
    }
};

module.exports = postNewPokemon;