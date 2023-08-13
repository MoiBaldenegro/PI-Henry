import axios from "axios";
import {
  GET_VIDEOGAMES,
  GET_VIDEOGAME_DETAIL,
  GET_VIDEOGAMES_NAME,
  CLEAN_DETAIL,
  GET_GENRES,
  ADD_FAV,
  DELETE_FAV,
  GET_FAV_BY_USERID,
} from "./action-types";

// Acción para obtener todos los videojuegos
export const getvideogames = () => {
  const endpoint = `http://localhost:3001/videogames/`;
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint);

      return dispatch({
        type: GET_VIDEOGAMES,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

// Acción para obtener los detalles de un videojuego específico
export const getvideogamedetail = (id) => {
  const endpoint = `http://localhost:3001/videogames/${id}`;
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint);

      return dispatch({
        type: GET_VIDEOGAME_DETAIL,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

// Acción para obtener 15 videojuegos filtrados por nombre
export const getvideogamesname = (name) => {
  const endpoint = `http://localhost:3001/videogames/name?name=${name}`;
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint);

      return dispatch({
        type: GET_VIDEOGAMES_NAME,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

// Acción para obtener todos los generos
export const getgenres = () => {
  const endpoint = `http://localhost:3001/videogames/genres`;
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint);

      return dispatch({
        type: GET_GENRES,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const addfavorite = (videogame) => {
  const endpoint = "http://localhost:3001/videogames/fav";

  return async (dispatch) => {
    try {
      const { data } = await axios.post(endpoint, videogame);

      return dispatch({
        type: ADD_FAV,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const deletefavorite = (id) => {
  const endpoint = `http://localhost:3001/videogames/fav/${id}`;
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(endpoint);
      return dispatch({
        type: DELETE_FAV,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getfavorites = (userid) => {
  const endpoint = `http://localhost:3001/videogames/fav/${userid}`;

  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint);
      return dispatch({
        type: GET_FAV_BY_USERID,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

// Acción para limpiar los detalles de un videojuego en el estado global
export const cleandetail = () => {
  return { type: CLEAN_DETAIL };
};
