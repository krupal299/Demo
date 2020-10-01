import {
  START_LOADING,
  STOP_LOADING,
  GET_ALBUMS,
  GET_DETAILS,
  ADD_FAV,
  REMOVE_FAV,
} from '../actionTypes';

export default class AlbumActions {
  static startLoading() {
    return {
      type: START_LOADING,
    };
  }
  static stopLoading() {
    return {
      type: STOP_LOADING,
    };
  }
  static getListSuccess(data) {
    return {
      type: GET_ALBUMS,
      data,
    };
  }
  static addToFav(ind) {
    return {
      type: ADD_FAV,
      ind,
    };
  }
  static removeFromFav(ind) {
    return {
      type: REMOVE_FAV,
      ind,
    };
  }
  static getListFailed(error) {
    return {
      type: GET_ALBUMS,
      error,
    };
  }
  static getDetailsSuccess(details) {
    return {
      type: GET_DETAILS,
      details,
    };
  }
  static getDetailsFailed(error) {
    return {
      type: GET_DETAILS,
      error,
    };
  }
}
