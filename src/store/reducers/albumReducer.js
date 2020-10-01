import {
  START_LOADING,
  STOP_LOADING,
  GET_ALBUMS,
  GET_DETAILS,
  ADD_FAV,
  REMOVE_FAV,
} from '../actionTypes';

const initialState = {
  isLoading: false,
  data: [],
  fav: [],
  error: null,
  details: null,
};

export default function AlbumReducer(state = initialState, action) {
  switch (action.type) {
    case START_LOADING:
      return {...state, isLoading: true};
    case STOP_LOADING:
      return {...state, isLoading: false};
    case GET_ALBUMS:
      return {...state, data: action.data};
    case GET_DETAILS:
      return {...state, details: {...action.details}};
    case ADD_FAV:
      const albums = state.data.map((item, index) => {
        if (index === action.ind) {
          item.isFav = !item.isFav;
        }
        return item;
      });
      const favorites = albums.filter((item) => item.isFav === true);
      return {...state, data: albums, fav: favorites};
    case REMOVE_FAV:
      return {...state, details: {...action.details}};
    default:
      return state;
  }
}
