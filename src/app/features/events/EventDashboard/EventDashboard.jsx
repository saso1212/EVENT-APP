import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Grid,GridColumn} from 'semantic-ui-react';
// binding alaow as to conect to firebase and is hireorder component
import {firestoreConnect} from 'react-redux-firebase';
import EventList from '../EventList/EventList';
import {deleteEvent} from '../eventActions'
import LoadingComponent from '../../../layout/LoadingComponent';
import EventActivity from '../EventActivity/EventActivity';


class EventDashboard extends Component {

  handleDeleteEvent=(eventId)=>()=>{
    this.props.deleteEvent(eventId)
  }
    render() {
     const {events,loading} =this.props;
        return ( 
          <Grid>
             {loading && <LoadingComponent inverted={true}/>}
              <GridColumn width={10}  >
              <EventList deleteEvent={this.handleDeleteEvent} events={events} />
              </GridColumn>
              <GridColumn width={6}>
              <EventActivity/>
              </GridColumn>
          </Grid>
        );
    }
}

const mapStateToProps=(state)=>{
  return {
    events:state.firestore.ordered.events,
    loading:state.async.loading
  }
}
const mapDispatchToProps={
    deleteEvent
}
// with this hire-order component we are lisaianing firebase not get date but lisening
export default connect(mapStateToProps,mapDispatchToProps)(
  //firestoreConnect metod we are lissening to the event
  firestoreConnect([{collection:'events'}])(EventDashboard)
  );



