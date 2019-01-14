import {SubmissionError,reset} from 'redux-form'
import {closeModal} from '../modals/modalActions'
import {toastr} from 'react-redux-toastr'
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
  
  export const socialLogin=(selectedProvider)=>{
   return async (dispatch, getState, {getFirebase,getFirestore}) => {
      const firebase=getFirebase();
      const firestore=getFirestore();
      try{
        dispatch(closeModal())
       let user = await firebase.login({
          provider:selectedProvider,
          type:'popup'
        })
        console.log(user);
        if(user.additionalUserInfo.isNewUser){
          await firestore.set(`users/${user.user.uid}`,{
            displayName:user.profile.displayName,
            photoURL:user.profile.avatarUrl,
            createdAt:firestore.FieldValue.serverTimestamp()
          })
        }  
      }
      catch(error){
        console.log(error)
      }
    }
  }

  export const updatePassword=(creds)=>{
    return async (dispatch,getState,{getFirebase}) =>{
      const firebase=getFirebase();
      const user=firebase.auth().currentUser;

      try{
        console.log(user)
        await user.updatePassword(creds.newPassword1)
        //reset new redux-form method that reset all files in the  form 
        //account is the name of the form
        await dispatch(reset('account'))
        toastr.success('Success', 'Your password has been succesufuly updated ')

      }
      catch(error){
        console.log(error)
        //  SummithigError with this method we throw error in our submit form so we can used
      throw new SubmissionError({
        _error: error.message
      })
      }
    }
  }
