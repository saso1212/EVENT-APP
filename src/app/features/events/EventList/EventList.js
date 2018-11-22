import React, { Component } from 'react';
import EventListItems from './EventListItems';

class EventList extends Component {
    render() {
        return (
            <div>
              <EventListItems/>
              <EventListItems/>
              <EventListItems/>
            </div>
        );
    }
}

export default EventList;