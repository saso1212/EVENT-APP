import React, { Component } from 'react'
import {Grid} from 'semantic-ui-react';
//import {toastr } from 'react-redux-toastr'
import {  withFirestore} from 'react-redux-firebase'
import {connect} from 'react-redux';
import { objectToArray } from '../../../common/utility/helpers'
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedSidebar from './EventDetailedSidebar';
import {goingToEvent,cancelGoingToEvent  } from '../../user/userActions'


 class EventDetailedPage extends Component {

  async componentDidMount(){
    const {firestore, match}=this.props;
    await firestore.setListener(`events/${match.params.id}`);
    //this is like a get request 
  //  let event= await firestore.get(`events/${match.params.id}`);
  //  console.log(event)
  //  //exist is the date the we get feom docsnapshote see in consloe.log
  //  if(!event.exists){
  //    history.push('/events');
  //    toastr.error('Sorry','Event not found');
  //  }
   
  }

  async componentWillUnmount(){
    const {firestore, match}=this.props;
    await firestore.unsetListener(`events/${match.params.id}`);
  }

  render() {
    const {event,auth,goingToEvent,cancelGoingToEvent} =this.props;
    const isHost = event.hostUid === auth.uid;
    const attendees=event && event.attendees && objectToArray(event.attendees);
    //true or false
    const isGoing = attendees && attendees.some(a => a.id === auth.uid);
    return (
      <Grid>
      <Grid.Column width={10}>
         <EventDetailedHeader event={event} isHost={isHost} goingToEvent={goingToEvent} cancelGoingToEvent={cancelGoingToEvent}  isGoing={isGoing}/>
         <EventDetailedInfo event={event}/>
         <EventDetailedChat/>
      </Grid.Column>
      <Grid.Column width={6}>
          <EventDetailedSidebar attendees={attendees}/>
      </Grid.Column>
  </Grid>
    )
  }
}


const mapStateToProp=(state)=>{
    
    let event={};
    if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
      event = state.firestore.ordered.events[0];
    }
    return{
        event:event,
        auth:state.firebase.auth
    }
  
}

const mapDispatchToProps={
  goingToEvent,
  cancelGoingToEvent
}


export default withFirestore(connect(mapStateToProp,mapDispatchToProps)(EventDetailedPage));