import {AlbumActions} from '../actions';
// import Globals from '../../utils/Globals';
import axios from 'axios';

export default class AlbumMiddleware {
  static getListMiddleware() {
    return (dispatch) => {
      dispatch(AlbumActions.startLoading());
      fetch('https://jsonplaceholder.typicode.com/albums')
        .then((response) => response.json())
        .then((res) => {
          var values = res.map((item) => {
            item.isFav = false;
            return item;
          });
          dispatch(AlbumActions.getListSuccess(values));
          dispatch(AlbumActions.stopLoading());
        })
        .catch((error) => {
          dispatch(AlbumActions.stopLoading());
          dispatch(AlbumActions.getListFailed(error));
        });

      // axios
      //   .get('https://jsonplaceholder.typicode.com/albums')
      //   .then(function (response) {
      //     // handle success
      //   })
      //   .catch(function (error) {

      //   });
    };
  }
}
