import * as actionTypes from './eventConstatnts';

export const createEvent=(event)=>{
   return{
     type:actionTypes.CREATE_EVENT,
     payload:{
         event
     }
   }
}

export const updateEvent=(event)=>{
    return{
      type:actionTypes.UPDATE_EVENT,
      payload:{
        event
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