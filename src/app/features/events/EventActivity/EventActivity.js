import React from 'react';
import {Header,Segment} from 'semantic-ui-react';

const EventActivity = () => {
    return (
        <div style={{margin:"1.5em 0"}}>
            <Header attached="top" content='Recent Activity'/>
            <Segment attached>
            <p>Recent Activity</p>
            </Segment>
        </div>
    );
};

export default EventActivity;