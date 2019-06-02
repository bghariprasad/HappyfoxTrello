import { combineReducers } from 'redux';
import trelloReducer from './trelloReducer';

const appReducer = combineReducers({
  trello: trelloReducer
});

export default appReducer;
