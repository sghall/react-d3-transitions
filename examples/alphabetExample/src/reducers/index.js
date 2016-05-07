import { combineReducers } from 'redux';
import { exampleReducer } from './exampleReducer';

export let rootReducer = combineReducers({
  example: exampleReducer
});
