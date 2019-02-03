import React, { Component } from 'react'
import {Grid} from 'semantic-ui-react';
import {toastr } from 'react-redux-toastr'
import {  withFirestore} from 'react-redux-firebase'
import {connect} from 'react-redux';
import { objectToArray } from '../../../common/utility/helpers'
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedSidebar from './EventDetailedSidebar';


 class EventDetailedPage extends Component {

  async componentDidMount(){
    const {firestore, match,history}=this.props;
    //this is like a get request 
   let event= await firestore.get(`events/${match.params.id}`);
   console.log(event)
   //exist is the date the we get feom docsnapshote see in consloe.log
   if(!event.exists){
     history.push('/events');
     toastr.error('Sorry','Event not found');
   }
   
  }

  render() {
    const {event} =this.props;
    const attendees=objectToArray(event.attendees)
    return (
      <Grid>
      <Grid.Column width={10}>
         <EventDetailedHeader event={event}/>
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
        event:event
    }
  
}


export default withFirestore(connect(mapStateToProp)(EventDetailedPage));