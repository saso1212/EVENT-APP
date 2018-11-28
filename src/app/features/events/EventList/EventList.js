import React, { Component } from 'react';
import EventListItems from './EventListItems';

class EventList extends Component {

    render() {
        const {events,onEventEdit,deleteEvent}=this.props;
        return (
            <div>
                {events.map((event)=>(
                   <EventListItems key={event.id} event={event} deleteEvent={deleteEvent} onEventEdit={onEventEdit}/>
                ))}
            </div>
        );
    }
}

export default EventList;