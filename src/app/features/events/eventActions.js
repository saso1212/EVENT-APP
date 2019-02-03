import * as actionTypes from './eventConstatnts';
import {asyncActionStart,asyncActionFinish,asyncActionError} from '../async/asyncActions';
import {fatchSampleData} from '../../data/mockAPI';
import {toastr} from 'react-redux-toastr'
import { createNewEvent } from '../../common/utility/helpers'


export const createEvent = event => {
  return async (dispatch, getState, { getFirestore,getFirebase }) => {
    const firestore = getFirestore();
    // const firebase=getFirebase();
    const user = firestore.auth().currentUser;
    const photoURL = getState().firebase.profile.photoURL;
    let newEvent = createNewEvent(user, photoURL, event);
    try {
      let createdEvent = await firestore.add(`events`, newEvent);
      //we have alredy created id with add function so we can use it
      await firestore.set(`event_attendee/${createdEvent.id}_${user.uid}`, {
        eventId: createdEvent.id,
        userUid: user.uid,
        eventDate: event.date,
        host: true
      });
      toastr.success('Success', 'Event has been created');
    } catch (error) {
      toastr.error('Oops', 'Something went wrong');
    }
  };
};


export const updateEvent=(event)=>{
  return async dispatch=>{
    try{
      dispatch({
        type:actionTypes.UPDATE_EVENT,
      payload:{
        event
      }
      })
     toastr.success('Succes','Event has been Updated')
    } 
    catch (error){
      toastr.error('Ooops','Somethig went wrong')
    } 
  }
 }

export const deleteEvent=(eventId)=>{
    return{
      type:actionTypes.DELETE_EVENT,
      payload:{
          eventId
      }
    }
 }

 export const fatchEvents=(events)=>{
   return {
     type:actionTypes.FATCH_EVENTS,
     payload:events
      }
 }



 export const loadEvents=()=>{
   return async dispatch=>{
     try {
      dispatch(asyncActionStart())
      let events= await fatchSampleData();
      dispatch(fatchEvents(events));
      dispatch(asyncActionFinish())
     }
     catch (error){
       console.log(error);
       dispatch(asyncActionError());
     }
   }
 }

 