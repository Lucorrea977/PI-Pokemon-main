const axios = require("axios");
const { Type } = require("../db");



const findTypes = async () => {
  const response = (await axios.get(`https://pokeapi.co/api/v2/type`)).data
    .results;
  return response;
};

const saveTypeBDD = async (types) => {

  for (let i = 0; i < types.length; i++) {
    const type = types[i];

      await Type.findOrCreate({ where: { name: type.name } });
    }
  };


module.exports = {findTypes, saveTypeBDD};