import React, { Component } from 'react';
import {Segment,Form,Button} from 'semantic-ui-react';
import {createEvent,updateEvent} from '../eventActions';
import {connect} from 'react-redux';
import cuid from 'cuid';

class EventForm extends Component {
    state={
        event:Object.assign({},this.props.event)
    }

    onFormSubmit=(event)=>{
        event.preventDefault();
       if (this.state.event.id)
        {this.props.updateEvent(this.state.event);
        this.props.history.goBack();
       }
        else
        {
          const newEvent={
            ...this.state.event,
            id:cuid(),
            hostPhotoURL:'/assets/user.png'
            
          }
          this.props.createEvent(newEvent)};
          this.props.history.push('/events');
    }
    onInputChange=(event)=>{
        const newEvent={...this.state.event}
        newEvent[event.target.name]=event.target.value
        this.setState({
            event:newEvent
        })
    }
    render() {
        return (
                 <Segment style={{margin:"1.5em 0"}}>
                   <Form>
                     <Form.Field>
                       <label>Event Title</label>
                       <input name='title' value={this.state.event.title} onChange={this.onInputChange} placeholder="First Name" />
                     </Form.Field>
                     <Form.Field>
                       <label>Event Date</label>
                       <input name='date' value={this.state.event.date} onChange={this.onInputChange} type="date" placeholder="Event Date" />
                     </Form.Field>
                     <Form.Field>
                       <label>City</label>
                       <input name='city' value={this.state.event.city} onChange={this.onInputChange} placeholder="City event is taking place" />
                     </Form.Field>
                     <Form.Field>
                       <label>Venue</label>
                       <input name='venue' value={this.state.event.venue} onChange={this.onInputChange} placeholder="Enter the Venue of the event" />
                     </Form.Field>
                     <Form.Field>
                       <label>Hosted By</label>
                       <input name='hostedBy' value={this.state.event.hostedBy} onChange={this.onInputChange} placeholder="Enter the name of person hosting" />
                     </Form.Field>
                     <Button positive type="submit" onClick={this.onFormSubmit}>
                       Submit
                     </Button>
                     <Button type="button" onClick={this.props.history.goBack}>Cancel</Button>
                   </Form>
                 </Segment>
        );
    }
}

const mapStateToProp=(state,ownProps)=>{
  const eventId=ownProps.match.params.id;
  let event={
    title:'',
    date:'',
    city:'',
    venue:'',
    hostedBy:''
  };
  if(eventId && state.events.length>0){
      event=state.events.filter(event=>event.id === eventId)[0]
  }
  return{
      event:event
  }
}
const mapDispatchToProps={
  createEvent,
  updateEvent
}

export default connect(mapStateToProp,mapDispatchToProps)(EventForm);