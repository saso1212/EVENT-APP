import React, { Component } from 'react';
import {Segment,Form,Button} from 'semantic-ui-react';

class EventForm extends Component {
    state={
        event:{
            title:'',
            date:'',
            city:'',
            vanue:'',
            hostedBy:''
        }
    }
    onFormSubmit=(event)=>{
        event.preventDefault();
        this.props.createEvent(this.state.event);
        
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
                       <input name='vanue' value={this.state.event.vanue} onChange={this.onInputChange} placeholder="Enter the Venue of the event" />
                     </Form.Field>
                     <Form.Field>
                       <label>Hosted By</label>
                       <input name='hostedBy' value={this.state.event.hostedBy} onChange={this.onInputChange} placeholder="Enter the name of person hosting" />
                     </Form.Field>
                     <Button positive type="submit" onClick={this.onFormSubmit}>
                       Submit
                     </Button>
                     <Button type="button" onClick={this.props.clicked}>Cancel</Button>
                   </Form>
                 </Segment>
        );
    }
}

export default EventForm;