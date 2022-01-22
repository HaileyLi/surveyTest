import { combineReducers } from 'redux';
import { submitReducer,saveReducer } from './reducer.js';

export default combineReducers({
    submit: submitReducer,
    save:saveReducer
})