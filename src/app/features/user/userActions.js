import moment from 'moment'
import {toastr} from 'react-redux-toastr'
import cuid from 'cuid'

//we use firebase so we dont need reducer and constsnt

export const updateProfile=(user)=>{
 return async (dispatch,getState,{getFirebase})=>{
        const firebase=getFirebase();
        const {isEmpty,isLoaded,providerData, ...updatedUser}=user;
            //we must convert user.dateOfBirth in to Javascrip object so we can pass into firebase
            if(updatedUser.dateOfBirth !== getState().firebase.profile.dateOfBirth){
                updatedUser.dateOfBirth=moment(updatedUser.dateOfBirth).toDate();
            }
        try{
            //this will update firestore user profile-- litlle bit strange but thi is only in this scenarioo
            await firebase.updateProfile(updatedUser);
            toastr.success('Success','Profile Update')
        }
        catch(error){
            console.log(error)
        }
    }
}
//set to Firebase Storage
export const uploadProfileImage=(file,fileName)=>{
    return async (dispatch,getState,{getFirebase,getFirestore})=>{
        const imageName=cuid();
        const firebase=getFirebase();
        const firestore=getFirestore();
        const user=firebase.auth().currentUser;
        const path=`${user.uid}/userImages`;
        const options={
            name:imageName
        }
        try{
            //upload file to firebase storage
            //path is the pathe where wi will upoad file,file is the file that we upload,
            // null is beacuse we will use firestore not the real firebase database and handle thet file manualu,
            //options will be the name of the file
            let uploadFile= await firebase.uploadFile(path,file,null,options);
            console.log(uploadFile);
             //get the url of the image from what we get return from firebase storage
            let downloadURL =await uploadFile.uploadTaskSnapshot.downloadURL;
            //get userdoc
            //get document from firestore
            //if we want to akses to deocument in firestore we must use data() method
            let userDoc= await firestore.get(`users/${user.uid}`)
             //check if the user has photo, if not update profile with the image
            if(!userDoc.data().photoURL){
                await firebase.updateProfile({
                    photoURL:downloadURL
                })
                await user.updateProfile({
                    photoURL:downloadURL
                })
            }
            //add the photo to photo collection
            await firestore.add({
                collection:'users',
                doc:user.uid,
                subcollections:[{collection:'photos'}]
            },
            //specifie the document we want to add
            {
                name:imageName,
                url:downloadURL
            })

        }catch(error){
            console.log(error)
            throw new Error('Problem uploading photo')
        }


    }
}

