
import {combineReducers} from 'redux';
import { reducer as FormReducer } from 'redux-form';
import eventReducer from '../features/events/eventReducer';
// import testReducer from './testReducer';

const rootReducer=combineReducers({
    form:FormReducer,
    events:eventReducer
});

export default rootReducer;