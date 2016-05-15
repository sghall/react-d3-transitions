import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import { reducer } from './reducers';

export default function configureStore(initialState) {
  return applyMiddleware(createLogger())(createStore)(reducer, initialState);
}
