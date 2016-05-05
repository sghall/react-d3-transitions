import { combineReducers } from 'redux';
import { exampleReducer } from './exampleReducer';

const rootReducer = combineReducers({
  example: exampleReducer
});

export default rootReducer;
