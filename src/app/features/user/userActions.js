import moment from 'moment'
import {toastr} from 'react-redux-toastr'

//we use firebase so we dont need reduser and constsnt

export const updateProfile=(user)=>{
 return async (dispatch,getState,{getFirebase})=>{
        const firebase=getFirebase();
        const {isEmpty,isLoaded,providerData, ...updatedUser}=user;
            //we must convert user.dateOfBirth in to Javascrip object so we can pass into firebase
            if(updatedUser.dateOfBirth !== getState().firebase.profile.dateOfBirth){
                updatedUser.dateOfBirth=moment(updatedUser.dateOfBirth).toDate();
            }
        try{
            //this will update firestore user profile-- little bit strange but thi is only in this scenarioo
            await firebase.updateProfile(updatedUser);
            toastr.success('Success','Profile Update')
        }
        catch(error){
            console.log(error)
        }
    }
}

