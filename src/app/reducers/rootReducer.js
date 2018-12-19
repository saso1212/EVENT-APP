
import {combineReducers} from 'redux';
import { reducer as FormReducer } from 'redux-form';
import eventReducer from '../features/events/eventReducer';
 import testReducer from './testReducer';
 import modalReducer from '../features/modals/modalReducer'; 
 import authReducer from '../features/auth/authReducer';

const rootReducer=combineReducers({
    form:FormReducer,
    events:eventReducer,
    test:testReducer,
    modals:modalReducer,
    auth:authReducer
});

export default rootReducer;