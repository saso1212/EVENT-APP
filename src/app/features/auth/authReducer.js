import {LOGIN_USER,SIGN_OUT_USER} from './authConstatnts';
import {createReducer} from '../../common/utility/reducerUtility';

const initialState={
    currentUser:{}
}

export const loginUser=(state,payload)=>{
    return{
        ...state,
        authenticated:true,
        currentUser:payload.creds.email
    }
}

export const signOutUser=(state,payload)=>{
    return{
        ...state,
        authenticated:false,
        currentUser:{}
    }
}

export default createReducer(initialState,{
    [LOGIN_USER]:loginUser,
    [SIGN_OUT_USER]:signOutUser
})