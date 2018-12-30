import {SubmissionError} from 'redux-form'
import {closeModal} from '../modals/modalActions'
// if I want inteleses with firebase I mast use this
//  import firebase from  'firebase'
//  firebase.updateProfile({})
//  firebase.auth().signInWithEmailAndPassword
export const login=(creds)=>{
    return async (dispatch,getState,{getFirebase}) =>{
        const firebase=getFirebase();
        try{
        await firebase.auth().signInWithEmailAndPassword(creds.email,creds.password);
         dispatch(closeModal());
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

export const registerUser = (user) => 
  async (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    try {
      // create the user in firebase auth
      let createdUser = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
      console.log(createdUser);
      // update the auth profile
      await createdUser.updateProfile({
        displayName: user.displayName
      })
      // create a new profile in firestore
      let newUser = {
        displayName: user.displayName,
        createdAt: firestore.FieldValue.serverTimestamp()
      }
      await firestore.set(`users/${createdUser.uid}`, {...newUser})
      dispatch(closeModal());
    } catch (error) {
      console.log(error)
      throw new SubmissionError({
        _error: error.message
      })
    }
  }

