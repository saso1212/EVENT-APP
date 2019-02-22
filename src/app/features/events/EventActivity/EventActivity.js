import React from 'react'
import { Header, Segment, Feed, Sticky } from 'semantic-ui-react'
import EventActivityItem from './EventActivityItem'
import './EventActivity.css'


const EventActivity = ({activities, contextRef}) => {
  return (
    <div className='EventActivity'>
    <Sticky context={contextRef} offset={120}   >
      <Header attached='top'  content='Recent Activity'/>
      <Segment attached>
        <Feed>
          {activities && activities.map((activity) => (
            <EventActivityItem   key={activity.id} activity={activity}/>
          ))}
        </Feed>
      </Segment>
    </Sticky>
    </div>
  )
}

export default EventActivity