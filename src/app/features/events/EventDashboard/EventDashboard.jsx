import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Grid,GridColumn} from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import {deleteEvent} from '../eventActions'
import LoadingComponent from '../../../layout/LoadingComponent';


class EventDashboard extends Component {

  handleDeleteEvent=(eventId)=>()=>{
    this.props.deleteEvent(eventId)
  }
    render() {
     const {events,loading} =this.props;
        return ( 
          <Grid>
             {loading && <LoadingComponent inverted={true}/>}
              <GridColumn width={10}>
              <EventList deleteEvent={this.handleDeleteEvent} events={events} />
              </GridColumn>
              <GridColumn width={6}>
              </GridColumn>
          </Grid>
        );
    }
}

const mapStateToProps=(state)=>{
  return {
    events:state.events,
    loading:state.async.loading
  }
}
const mapDispatchToProps={
    deleteEvent
}

export default connect(mapStateToProps,mapDispatchToProps)(EventDashboard);



