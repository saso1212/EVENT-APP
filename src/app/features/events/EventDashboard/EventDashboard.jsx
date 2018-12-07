import React, { Component } from 'react';

import {connect} from 'react-redux';
import {Grid,GridColumn} from 'semantic-ui-react';
import EventList from '../EventList/EventList';

import {deleteEvent} from '../eventActions'


class EventDashboard extends Component {

  handleDeleteEvent=(eventId)=>()=>{
    this.props.deleteEvent(eventId)
  }
    render() {
     const {events} =this.props;
        return (
          <Grid>
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
    events:state.events
  }
}
const mapDispatchToProps={
    deleteEvent
}

export default connect(mapStateToProps,mapDispatchToProps)(EventDashboard);



