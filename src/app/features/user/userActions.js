import moment from 'moment'
import {toastr} from 'react-redux-toastr'
import cuid from 'cuid'
import firebase from '../../config/firebase'
import { FATCH_EVENTS } from '../events/eventConstatnts'
import {asyncActionStart,asyncActionFinish,asyncActionError} from '../async/asyncActions'

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
            dispatch(asyncActionStart());
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
            dispatch(asyncActionFinish())

        }catch(error){
            dispatch(asyncActionError())
            console.log(error)
            throw new Error('Problem uploading photo')
        }


    }
}

export const deletePhoto=(photo)=>{
    //we will need to delete photo into firebaseColection and in to firestore
    return async (dispatch,getState,{getFirebase,getFirestore})=>{
        const firebase=getFirebase();
        const firestore=getFirestore();
        const user=firebase.auth().currentUser;
        try{
           await firebase.deleteFile(`${user.uid}/userImages/${photo.name}`);
            await firestore.delete({
                collection:'users',
                doc:user.uid,
                subcollections:[{collection:'photos',doc:photo.id}]
            })
        }
        catch(error){
            dispatch(asyncActionError());
            console.log(error);
            throw new Error('Problem with delete photo')
        }
    }
}

export const setMainPhoto=photo=>{
    return async (dispatch,getState,{getFirebase})=>{
        const firebase=getFirebase();
        try{
            dispatch(asyncActionStart());
            await firebase.updateProfile({
                photoURL:photo.url
            })
            dispatch(asyncActionFinish())
        }
        catch(error){
            console.log(error);
            dispatch(asyncActionError())
            throw new Error('Propblem with set main photo')
        }
    }
}


export const goingToEvent = (event) => 
  async (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    const user = firestore.auth().currentUser;
    const photoURL = getState().firebase.profile.photoURL;
    const attendee = {
      going: true,
      joinDate: Date.now(),
      photoURL: photoURL || '/assets/user.png',
      displayName: user.displayName,
      host: false
    }
    try {
      await firestore.update(`events/${event.id}`, {
        [`attendees.${user.uid}`]: attendee
      })
      
      await firestore.set(`event_attendee/${event.id}_${user.uid}`, {
        eventId: event.id,
        userUid: user.uid,
        eventDate: event.date,
        host: false
      })
      toastr.success('Success', 'You have signed up to the event');
    } catch (error) {
      console.log(error);
      toastr.error('Oops', 'Problem signing up to event')
    }
  }

export const cancelGoingToEvent = (event) => 
  async (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    const user = firestore.auth().currentUser;
    try {
      await firestore.update(`events/${event.id}`, {
        [`attendees.${user.uid}`]: firestore.FieldValue.delete()
      })
      await firestore.delete(`event_attendee/${event.id}_${user.uid}`);
      toastr.success('Success', 'You have removed yourself from the event');
    } catch (error) {
      console.log(error)
      toastr.error('Oops', 'something went wrong')
    }

  }

  export const getUserEvents = (userUid, activeTab) => async (dispatch, getState) => {
    dispatch(asyncActionStart());
    const firestore = firebase.firestore();
    const today = new Date(Date.now());
    let eventsRef = firestore.collection('event_attendee');
    console.log(eventsRef);
    let query;
    switch (activeTab) {
      case 1: // past events
        query = eventsRef
          .where('userUid', '==', userUid)
          .where('eventDate', '<=', today)
          .orderBy('eventDate', 'desc');
        break;
      case 2: // future events
        query = eventsRef
          .where('userUid', '==', userUid)
          .where('eventDate', '>=', today)
          .orderBy('eventDate');
        break;
      case 3: // hosted events
        query = eventsRef
          .where('userUid', '==', userUid)
          .where('host', '==', true)
          .orderBy('eventDate', 'desc');
        break;
      default:
        query = eventsRef.where('userUid', '==', userUid).orderBy('eventDate', 'desc');
    }
    try {
      let querySnap = await query.get();
        //get the actual events from firestore
      let events = [];
      for (let i=0; i<querySnap.docs.length; i++) {
        let evt = await firestore.collection('events').doc(querySnap.docs[i].data().eventId).get();
        events.push({...evt.data(), id: evt.id})
      }
      console.log('events',events)
      //push in the event reducer that we creted
      dispatch({type: FATCH_EVENTS, payload: {events}})    
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };