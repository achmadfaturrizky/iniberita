import { GET_ARTICLES_PENDING, GET_ARTICLES_FULFILLED } from '../actions/types';

const initialState = {
  article: {},
  articles: [],
  isLoading: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ARTICLES_PENDING:
      return {
        ...initialState,
        isLoading: true
      };

    case GET_ARTICLES_FULFILLED:
      return {
        ...initialState,
        articles: payload,
        isLoading: false
      };

    default:
      return state;
  }
};
