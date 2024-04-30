import axios from "axios";

export function postPokemon(payload) {
  return async function () {
    try {
      const response = await axios.post("/pokemons", payload);
      return response;
    } catch (error) {
      // Manejar el error
    }
  };
}

export function searchPoke(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get("/pokemons?name=" + name);
      return dispatch({
        type: "SEARCH_NAME",
        payload: json.data,
      });
    } catch {
      alert("No se encontró el pokemon");
    }
  };
}

export function filterPokemonsByType(payload) {
  return {
    type: "FILTER_BY_TYPE",
    payload,
  };
}

export function Sort(order) {
  return {
    type: "SORT",
    payload: order,
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

export function getPokemons() {
  return async function (dispatch) {
    var json = await axios.get("/pokemons");
    dispatch({
      type: "GET_POKEMONS",
      payload: json.data,
    });
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`/pokemons/${id}`);
      return dispatch({
        type: "GET_DETAILS",
        payload: json.data,
      });
    } catch (error) {
      // Manejar el error
    }
  };
}

export function getType() {
  return async function (dispatch) {
    var json = await axios.get("/types");
    return dispatch({
      type: "GET_TYPE",
      payload: json.data,
    });
  };
}

