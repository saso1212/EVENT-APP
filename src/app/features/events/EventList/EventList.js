import React, { Component } from 'react';
import EventListItems from './EventListItems';

class EventList extends Component {
    render() {
        const {events}=this.props;
        return (
            <div>
                {events.map((event)=>(
                   <EventListItems key={event.id} events={event}/>
                ))}
            </div>
        );
    }
}

export default EventList;