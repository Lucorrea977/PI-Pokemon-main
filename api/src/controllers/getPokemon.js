const axios = require("axios");
const { Pokemon, Type } = require("../db");

// GET A LOS DATOS DE LA API 
const getApiInfo = async () => {
    const resp = await axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=40")
      .then((data) => {
        return data.data.results;
      })
      .then((data) => {
        return Promise.all(data.map((res) => axios.get(res.url))); // ENTRAR A CADA ELEMENTO Y HACERLE UN GET A SU URL
      })
      .then((data) => {
        return data.map((res) => res.data); // RESULTADO FINAL DE CADA POKEMON CON TODOS SUS DATOS, SE GUARDAN EN RESP.
      });
    let arrayPoke = resp.map((result) => {  //DENTRO DE UN ARRAY ME TRAIGO TODAS LAS PROPIEDADES QUE QUIERO DE CADA POKEMON.
      return {
        id: result.id,
        name: result.name,
        types: result.types.map((t) => t.type.name), //lOS TIPOS ESTAN EN SU PROPIEDAD NAME
        image: result.sprites.front_default,
        hp: result.stats[0].base_stat,
        attack: result.stats[1].base_stat,
        defense: result.stats[2].base_stat,
        speed: result.stats[3].base_stat,
        height: result.height,
        weight: result.weight,
      };
    });
    return arrayPoke;
  };

  // GET A LOS DATOS DE LA BASE DE DATOS
  const getDbInfo = async () => {
    try{
      const results = await Pokemon.findAll({ //TRAERME TODO LO DE LA TABLA POKEMON, INCLUIDA LA RELACION CON TYPE
          include:{
              model: Type,
              attributes: ['name'],
              through:{
                  attributes: [],
              }
          }
      })
      return results;
    } catch (error) {
      return [];
    }
  };

//CONCATENACION DE LOS DOS RESULTADOS ENCONTRADOS..
  const getAllPokemons = async () => { 
    const apiInfo = await getApiInfo(); //GUARDO LOS DATOS DE LA CONSULTA A LA API
    const dbInfo = await getDbInfo();   //GUARDO LOS DATOS DE LA CONSULTA A LA DB
    const infoTotal = apiInfo.concat(dbInfo); //CONCATENO LAS DOS Y RETORNO ESTO.
    return infoTotal;
  };
  

  module.exports = getAllPokemons;