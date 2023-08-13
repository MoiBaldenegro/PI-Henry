import {
  GET_VIDEOGAMES,
  GET_VIDEOGAME_DETAIL,
  CLEAN_DETAIL,
  GET_VIDEOGAMES_NAME,
  GET_GENRES,
  ADD_FAV,
  DELETE_FAV,
  GET_FAV_BY_USERID,
} from "./action-types";

const initialState = {
  videogames: [],
  genres: [],
  videogamedetail: {},
  myfavorites: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
      };

    case GET_VIDEOGAME_DETAIL:
      return {
        ...state,
        videogamedetail: action.payload,
      };

    case GET_VIDEOGAMES_NAME:
      return {
        ...state,
        videogames: action.payload,
      };

    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };

    case ADD_FAV:
      return {
        ...state,
        myfavorites: action.payload,
      };

    case DELETE_FAV:
      return {
        ...state,
        myfavorites: action.payload,
      };

    case GET_FAV_BY_USERID:
      return { ...state, myfavorites: action.payload };

    case CLEAN_DETAIL:
      return { ...state, videogamedetail: {} };

    default:
      return { ...state };
  }
};
export default reducer;
