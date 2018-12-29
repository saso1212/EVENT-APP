import React, { Component } from 'react';
import EventListItems from './EventListItems';

class EventList extends Component {

    render() {
        
        const {events,deleteEvent}=this.props;
        return (
            <div>
                {/* we chack if there is events firt because the com from database and come after 
                the page is loaded */}
                {events && events.map((event)=>(
                   <EventListItems  key={event.id} event={event} deleteEvent={deleteEvent} />
                ))}
            </div>
        );
    }
}

export default EventList;