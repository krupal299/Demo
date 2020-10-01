import {combineReducers} from 'redux';
import AlbumReducer from './albumReducer';

const RootReducer = combineReducers({
  AlbumReducer,
});

export default RootReducer;
