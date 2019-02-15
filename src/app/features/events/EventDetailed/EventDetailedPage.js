// import React, { Component } from 'react'
// import {Grid} from 'semantic-ui-react';
// //import {toastr } from 'react-redux-toastr'
// import {  withFirestore} from 'react-redux-firebase'
// import {connect} from 'react-redux';
// import { objectToArray } from '../../../common/utility/helpers'
// import EventDetailedHeader from './EventDetailedHeader';
// import EventDetailedInfo from './EventDetailedInfo';
// import EventDetailedChat from './EventDetailedChat';
// import EventDetailedSidebar from './EventDetailedSidebar';
// import {goingToEvent,cancelGoingToEvent  } from '../../user/userActions'


//  class EventDetailedPage extends Component {

//   async componentDidMount(){
//     const {firestore, match}=this.props;
//     await firestore.setListener(`events/${match.params.id}`);
//     //this is like a get request 
//   //  let event= await firestore.get(`events/${match.params.id}`);
//   //  console.log(event)
//   //  //exist is the date the we get feom docsnapshote see in consloe.log
//   //  if(!event.exists){
//   //    history.push('/events');
//   //    toastr.error('Sorry','Event not found');
//   //  }
   
//   }

//   async componentWillUnmount(){
//     const {firestore, match}=this.props;
//     await firestore.unsetListener(`events/${match.params.id}`);
//   }

//   render() {
//     const {event,auth,goingToEvent,cancelGoingToEvent} =this.props;
//     const isHost = event.hostUid === auth.uid;
//     const attendees=event && event.attendees && objectToArray(event.attendees);
//     //true or false
//     const isGoing = attendees && attendees.some(a => a.id === auth.uid);
//     return (
//       <Grid>
//       <Grid.Column width={10}>
//          <EventDetailedHeader event={event} isHost={isHost} goingToEvent={goingToEvent} cancelGoingToEvent={cancelGoingToEvent}  isGoing={isGoing}/>
//          <EventDetailedInfo event={event}/>
//          <EventDetailedChat/>
//       </Grid.Column>
//       <Grid.Column width={6}>
//           <EventDetailedSidebar attendees={attendees}/>
//       </Grid.Column>
//   </Grid>
//     )
//   }
// }


// const mapStateToProp=(state)=>{
    
//     let event={};
//     if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
//       event = state.firestore.ordered.events[0];
//     }
//     return{
//         event:event,
//         auth:state.firebase.auth
//     }
  
// }

// const mapDispatchToProps={
//   goingToEvent,
//   cancelGoingToEvent
// }


// export default withFirestore(connect(mapStateToProp,mapDispatchToProps)(EventDetailedPage));
import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withFirestore, firebaseConnect, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedSidebar from './EventDetailedSidebar';
import { objectToArray, createDataTree } from '../../../common/utility/helpers';
import { goingToEvent, cancelGoingToEvent } from '../../user/userActions';
import { addEventComment } from '../eventActions';

const mapState = (state, ownProps) => {
  let event = {};

  if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
    event = state.firestore.ordered.events[0];
  }

  return {
    event,
    auth: state.firebase.auth,
    eventChat:
      !isEmpty(state.firebase.data.event_chat) &&
      objectToArray(state.firebase.data.event_chat[ownProps.match.params.id])
  };
};

const actions = {
  goingToEvent,
  cancelGoingToEvent,
  addEventComment
};

class EventDetailedPage extends Component {
  async componentDidMount() {
    const { firestore, match } = this.props;
    await firestore.setListener(`events/${match.params.id}`);
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`events/${match.params.id}`);
  }

  render() {
    const { event, auth, goingToEvent, cancelGoingToEvent, addEventComment, eventChat } = this.props;
    const attendees = event && event.attendees && objectToArray(event.attendees);
    const isHost = event.hostUid === auth.uid;
    const isGoing = attendees && attendees.some(a => a.id === auth.uid);
    const chatTree = !isEmpty(eventChat) && createDataTree(eventChat)
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventDetailedHeader
            event={event}
            isHost={isHost}
            isGoing={isGoing}
            goingToEvent={goingToEvent}
            cancelGoingToEvent={cancelGoingToEvent}
          />
          <EventDetailedInfo event={event} />
          <EventDetailedChat eventChat={chatTree} addEventComment={addEventComment} eventId={event.id} />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventDetailedSidebar attendees={attendees} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default compose(
  withFirestore,
  connect(mapState, actions),
  firebaseConnect(props => [`event_chat/${props.match.params.id}`])
)(EventDetailedPage);
