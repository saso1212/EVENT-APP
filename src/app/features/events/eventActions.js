import * as actionTypes from './eventConstatnts';
import {asyncActionStart,asyncActionFinish,asyncActionError} from '../async/asyncActions';
import {fatchSampleData} from '../../data/mockAPI';
import {toastr} from 'react-redux-toastr'
import moment from 'moment'
import compareAsc from 'date-fns/compare_asc'
import { createNewEvent } from '../../common/utility/helpers'
import firebase from '../../config/firebase';

//create document in firestore
export const createEvent = event => {
  return async (dispatch, getState, { getFirestore,getFirebase }) => {
    const firestore = getFirestore();
    // const firebase=getFirebase();
    // in the new versinon of firebase there in no posebilitu to take user with firestore 
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

export const updateEvent = event => {
  return async (dispatch, getState) => {
    
  //   const firestore = getFirestore();
  //   //we must check if the date is diferent from the existing date because in the date componet it will hapend 
  //   //some invalide data... we must do this
  //   if (event.date !== getState().firestore.ordered.events[0].date) {
  //     //we do moment function this because firestore will complain with the date
  //     event.date = moment(event.date).toDate();
  //   }
  //   try {
  //     await firestore.update(`events/${event.id}`, event);
  //     toastr.success('Success', 'Event has been updated');
  //   } catch (error) {
  //     console.log(error);
  //     toastr.error('Oops', 'Something went wrong');
  //   }
  dispatch(asyncActionStart());
  const firestore = firebase.firestore();
  //we need to compare the prewius date with the new one, if the data is chamnged then .....
  if (event.date !== getState().firestore.ordered.events[0].date) {
    event.date = moment(event.date).toDate();
  }
  try {
    let eventDocRef = firestore.collection('events').doc(event.id);
    // in the firebase compare of date is a little bit tricky so we must use date/fsn 
    //we will compare the date in firebase before updtae and the date in our form
    let dateEqual = compareAsc(getState().firestore.ordered.events[0].date.toDate(), event.date);
    if (dateEqual !== 0) {
      let batch = firestore.batch();
      await batch.update(eventDocRef, event);

      let eventAttendeeRef = firestore.collection('event_attendee');
      let eventAttendeeQuery = await eventAttendeeRef.where('eventId', '==', event.id);
      let eventAttendeeQuerySnap = await eventAttendeeQuery.get();

      for (let i = 0; i < eventAttendeeQuerySnap.docs.length; i++) {
        let eventAttendeeDocRef = await firestore.collection('event_attendee').doc(eventAttendeeQuerySnap.docs[i].id);
        await batch.update(eventAttendeeDocRef, {
          eventDate: event.date
        })
      }
      await batch.commit();
    } else {
      await eventDocRef.update(event);
    }
    dispatch(asyncActionFinish());
    toastr.success('Success', 'Event has been updated');
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
    toastr.error('Oops', 'Something went wrong');
  }
   };
};

//cancelled will be true or false
export const cancelToggle = (cancelled, eventId) =>
 async (dispatch,getState,{ getFirestore }) => {
  const firestore = getFirestore();
  //if true?  :  
  const message = cancelled
    ? 'Are you sure you want to cancel the event?'
    : 'This reactivate the event - are you sure?';
  try {
    toastr.confirm(message, {
      onOk: () =>
        firestore.update(`events/${eventId}`, {
          //if there is no cancalled it will cretaed   in firesbase 
          cancelled: cancelled
        })
    });
  } catch (error) {
    console.log(error);
  }
};

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
//fatch events with firebase functions
 export const getEventsForDashboard = lastEvent => async (dispatch, getState) => {
  let today = new Date(Date.now());
  const firestore = firebase.firestore();
  const eventsRef = firestore.collection('events');
  console.log(eventsRef);
  try {
    dispatch(asyncActionStart());
    //for paging this is that document that we want to start up
    //we must check if we have last event
    let startAfter =
      lastEvent &&
      (await firestore
        .collection('events')
        .doc(lastEvent.id)
        .get());
        
    let query;

    lastEvent
      ? (query = eventsRef
          .where('date', '>=', today)
          .orderBy('date')
          .startAfter(startAfter)
          .limit(3))
      : (query = eventsRef
          .where('date', '>=', today)
          .orderBy('date')
          .limit(3));
    
    let querySnap = await query.get();
    console.log('querySnap',querySnap);

    if (querySnap.docs.length === 0) {
      dispatch(asyncActionFinish());
      return querySnap;
    }

    let events = [];

    for (let i = 0; i < querySnap.docs.length; i++) {
      let evt = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id };
      events.push(evt);
    }
    console.log(events);
    dispatch({ type: actionTypes.FATCH_EVENTS, payload: { events } });
    dispatch(asyncActionFinish());
    return querySnap;
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};

//Realtime database

export const addEventComment = (eventId, values, parentId) => 
  async (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    const profile = getState().firebase.profile;
    const user = firebase.auth().currentUser;
    let newComment = {
      parentId: parentId,
      displayName: profile.displayName,
      photoURL: profile.photoURL || '/assets/user.png',
      uid: user.uid,
      text: values.comment,
      date: Date.now()
    }
    try {
      await firebase.push(`event_chat/${eventId}`, newComment)
    } catch (error) {
      console.log(error);
      toastr.error('Oops', 'Problem adding comment')
    }
  }