import {SubmissionError} from 'redux-form'
import {SIGN_OUT_USER} from './authConstatnts';
import {closeModal} from '../modals/modalActions'
import {toastr} from 'react-redux-toastr'
// if I want inteleses with firebase I mast use this
// import firebase from  'firebase'
//  firebase.auth().signInWithEmailAndPassword
export const login=(creds)=>{
    return async (dispatch,getState,{getFirebase}) =>{
        const firebase=getFirebase();
        try{
        await firebase.auth().signInWithEmailAndPassword(creds.email,creds.password);
         dispatch(closeModal());
         toastr.success('Succes','You have been succesfuli Login')

        }
        catch (error){
            console.log(error);
           // with this method we well aveable error in the form
            throw new SubmissionError({
                _error:error.message
            })
            
            
            // throw new SubmissionError({
            //     _error:'Login Failed'
            // })
        }
    }
}

export const logout=()=>{
    return{
        type:SIGN_OUT_USER
    } 
}

