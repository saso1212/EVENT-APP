
    import {combineReducers} from 'redux';
    import { reducer as FormReducer } from 'redux-form';
    import {reducer as toastrReducer} from 'react-redux-toastr'
    import eventReducer from '../features/events/eventReducer';
    import testReducer from './testReducer';
    import modalReducer from '../features/modals/modalReducer'; 
    import authReducer from '../features/auth/authReducer';
    import asyncReducer from '../features/async/asyncReducer';
    import {firebaseReducer} from  'react-redux-firebase';
    import {firestoreReducer} from 'redux-firestore';

const rootReducer=combineReducers({
    firebase:firebaseReducer,
    firestore:firestoreReducer,
    form:FormReducer,
    events:eventReducer,
    test:testReducer,
    modals:modalReducer,
    auth:authReducer,
    async:asyncReducer,
    toastr:toastrReducer
});

export default rootReducer;