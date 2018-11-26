import React, { Component } from 'react';
import EventListItems from './EventListItems';

class EventList extends Component {

    render() {
        const {events,onEventEdit}=this.props;
        return (
            <div>
                {events.map((event)=>(
                   <EventListItems key={event.id} event={event} onEventEdit={onEventEdit}/>
                ))}
            </div>
        );
    }
}

export default EventList;