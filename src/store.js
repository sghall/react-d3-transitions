import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

export default function configureStore(initialState) {
  return applyMiddleware(thunk, createLogger())(createStore)(rootReducer, initialState);
}
