import testReducer from './testReducer';
import {combineReducers} from 'redux';
import eventReducer from '../features/events/eventReducer';

const rootReducer=combineReducers({
    test:testReducer,
    events:eventReducer
});

export default rootReducer;