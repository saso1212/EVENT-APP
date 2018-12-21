import {createReducer} from '../../common/utility/reducerUtility';
import {CREATE_EVENT,DELETE_EVENT,UPDATE_EVENT, FATCH_EVENTS} from './eventConstatnts';


 const initialState = [];

      export const createEvent=(state,payload)=>{
            return [...state,{...payload.event}]
      }
     
      export  const deleteEvent=(state,payload)=>{
        return [...state.filter(event=>event.id !== payload.eventId)]
      }  
      export  const updateEvent=(state,payload)=>{
        return [...state.filter(event=>event.id !== payload.event.id),
          Object.assign({},payload.event)]
    }
    export const fatchEvents=(state,payload)=>{
      return payload.events
    }

      export default createReducer(initialState,{
          [CREATE_EVENT]:createEvent,
          [UPDATE_EVENT]:updateEvent,
          [DELETE_EVENT]:deleteEvent,
          [FATCH_EVENTS]:fatchEvents
       
      })