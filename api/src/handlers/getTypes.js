const { Type } = require("../db");
const { findTypes, saveTypeBDD } = require("../controllers/findTypes");

const getTypes = async (req, res) => {
    try {
        const types = await findTypes()
        await saveTypeBDD(types)

        const allTypes = await Type.findAll()

        return res.status(200).send(allTypes);
    } catch (error) {
        res.status(500).json({ "error": error.message });
    }
};
module.exports = getTypes;