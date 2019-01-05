import * as actionTypes from './eventConstatnts';
import {asyncActionStart,asyncActionFinish,asyncActionError} from '../async/asyncActions';
import {fatchSampleData} from '../../data/mockAPI';
import {toastr} from 'react-redux-toastr'


export const createEvent=(event)=>{
   return async dispatch=>{
        try{
          dispatch({
            type:actionTypes.CREATE_EVENT,
            payload:{
              event
            }})
         toastr.success('Succes','Event has been Created')
        } 
        catch (error){
          toastr.error('Ooops','Somethig went wrong')
        } 
     }
   }


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

 