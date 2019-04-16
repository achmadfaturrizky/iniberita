import { combineReducers } from 'redux';
import error from './errorReducers';
import article from './articleReducers';


export default combineReducers({
  error,
  article,
});
