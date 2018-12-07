import React, { Component } from 'react';
import cuid from 'cuid';
import {connect} from 'react-redux';
import {Grid,GridColumn,Button} from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import EventForm from '../EventForm/EventForm';
import user from '../../../../assets/images/user.png'
import {createEvent,updateEvent,deleteEvent} from '../eventActions'


class EventDashboard extends Component {
  state={
    isOpen:false,
    selectedEvent:null
  }

  handleFormOpen=()=>{
   this.setState({isOpen:true,selectedEvent:null})
  }
  handleFormClosed=()=>{
    this.setState({isOpen:false})
  }
  handleEditEvent=(eventToUpdate)=>()=>{
    this.setState({
      selectedEvent:eventToUpdate,
      isOpen:true})
  }
  handleUpdateEvent=(updatedEvent)=>{
    this.props.updateEvent(updatedEvent);
    this.setState({
      isOpen:false,
      selectedEvent:null
    })
  }
  handleDeleteEvent=(eventId)=>()=>{
    this.props.deleteEvent(eventId)
  }
  handleCreateEvent=(newEvent)=>{
    newEvent.id=cuid();
    newEvent.hostPhotoURL=user;
    this.props.createEvent(newEvent);
    this.setState({
      isOpen:false
    })
  }
    render() {
      const {selectedEvent}=this.state;
     const {events} =this.props;
        return (
          <Grid>
              <GridColumn width={10}>
              <h1>Event List</h1>
              <EventList deleteEvent={this.handleDeleteEvent} events={events} onEventEdit={this.handleEditEvent}/>
              </GridColumn>
              <GridColumn width={6}>
              <Button positive onClick={this.handleFormOpen} content='Create Event' />
              {this.state.isOpen &&  <EventForm updateEvent={this.handleUpdateEvent} selectedEvent={selectedEvent} createEvent={this.handleCreateEvent} clicked={this.handleFormClosed} /> } 
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
    createEvent,
    updateEvent,
    deleteEvent
}

export default connect(mapStateToProps,mapDispatchToProps)(EventDashboard);



