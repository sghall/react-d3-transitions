import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import { rootReducer } from './reducers';

export default function configureStore(initialState) {
  return applyMiddleware(createLogger())(createStore)(rootReducer, initialState);
}
