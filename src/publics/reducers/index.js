import { combineReducers } from 'redux';
import error from './errorReducers';
import article from './articleReducers';
import book from './bookReducers';
import articleSearch from './articleSearchReducers';

export default combineReducers({
  error,
  article,
  book,
  articleSearch
});
