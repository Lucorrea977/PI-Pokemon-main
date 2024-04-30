import axios from "axios";

export function postPokemon(payload) {
  return async function () {
    try {
      const response = await axios.post("/pokemons", payload);
      return response;
    } catch (error) {
     
    }
  };
}

export function searchPoke(name) {
  return async function (dispatch) {
    try {
      const json = await axios.get("/pokemons?name=" + name);
      return dispatch({
        type: "SEARCH_NAME",
        payload: json.data,
      });
    } catch (error) {
      
      alert("No se encontró el Pokémon");
    }
  };
}

export function filterByType(payload) {
  return {
    type: "FILTER_BY_TYPE",
    payload,
  };
}

export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}

export function filterByAttack(payload) {
  return {
    type: "FILTER_BY_ATTACK",
    payload,
  };
}

export function Sort(payload) {
  return {
    type: "SORT",
    payload,
  };
}

export function getPokemons() {
  return async function (dispatch) {
    try {
      const json = await axios.get("/pokemons");
      dispatch({
        type: "GET_POKEMONS",
        payload: json.data,
      });
    } catch (error) {
    
    }
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      const json = await axios.get(`/pokemons/${id}`);
      return dispatch({
        type: "GET_DETAILS",
        payload: json.data,
      });
    } catch (error) {
     
    }
  };
}

export function getType() {
  return async function (dispatch) {
    try {
      const json = await axios.get("/types");
      return dispatch({
        type: "GET_TYPE",
        payload: json.data,
      });
    } catch (error) {
    
    }
  };
}
