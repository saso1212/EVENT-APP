import React, { Component } from 'react';
import cuid from 'cuid';
import {Grid,GridColumn,Button} from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import EventForm from '../EventForm/EventForm';

const eventDashboard = [
  {
    id: '1',
    title: 'Trip to Tower of London',
    date: '2018-03-27T11:00:00+00:00',
    category: 'culture',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: "Tower of London, St Katharine's & Wapping, London",
    hostedBy: 'Bob',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
    attendees: [
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
      },
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
      }
    ]
  },
  {
    id: '2',
    title: 'Trip to Punch and Judy Pub',
    date: '2018-03-28T14:00:00+00:00',
    category: 'drinks',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: 'Punch & Judy, Henrietta Street, London, UK',
    hostedBy: 'Tom',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
    attendees: [
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
      },
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
      }
    ]
  }
]


class EventDashboard extends Component {
  state={
    events:eventDashboard,
    isOpen:false
  }

  handleFormOpen=()=>{
   this.setState({isOpen:true})
  }
  handleFormClosed=()=>{
    this.setState({isOpen:false})
  }
  handleCreateEvent=(newEvent)=>{
    newEvent.id=cuid();
    newEvent.hostPhotoURL='/assets/logo.png';
    const updatedEvent=[...this.state.events,newEvent];
    this.setState({
      events:updatedEvent,
      isOpen:false
    })

  }
    render() {
        return (
          <Grid>
              <GridColumn width={10}>
              <h1>Event List</h1>
              <EventList events={this.state.events}/>
              </GridColumn>
              <GridColumn width={6}>
              <Button positive onClick={this.handleFormOpen} content='Create Event' />
              {this.state.isOpen &&  <EventForm createEvent={this.handleCreateEvent} clicked={this.handleFormClosed} /> } 
              </GridColumn>
          </Grid>
        );
    }
}

export default EventDashboard;



