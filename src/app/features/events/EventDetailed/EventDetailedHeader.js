import React from 'react';
import {Segment,Image,Header,Button,Item} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import format from 'date-fns/format'

const eventImageStyle = {
    filter: 'brightness(60%)'
};

const eventImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

const EventDetailedHeader=({event,isHost,isGoing,goingToEvent,cancelGoingToEvent,loading})=> {
  let eventDate;
  if (event.date) {
    eventDate = event.date.toDate();
  } 
        return (
             <Segment.Group>
                <Segment basic attached="top" style={{ padding: '0' }}>
                  <Image src={`/assets/categoryImages/${event.category}.jpg`} fluid style={eventImageStyle} />
          
                  <Segment basic style={eventImageTextStyle}>
                    <Item.Group>
                      <Item>
                        <Item.Content>
                          <Header
                            size="huge"
                            content={event.title}
                            style={{ color: 'white' }}
                          />
                          <p>{format(eventDate, 'dddd Do MMMM')}</p>
                          <p>
                            Hosted by <strong>{event.hostedBy}</strong>
                          </p>
                        </Item.Content>
                      </Item>
                    </Item.Group>
                  </Segment>
                </Segment>
          
                <Segment attached="bottom">
                {!isHost && (
                 <div>
                  {isGoing ? (
                  <Button onClick={()=>cancelGoingToEvent(event)}>Cancel My Place</Button>
                    ) : (
                    <Button loading={loading} color="teal" onClick={()=>goingToEvent(event)}>JOIN THIS EVENT</Button>
                    )}
                   </div>
                   )}
          
                 {isHost && <Button as={Link} to={`/menage/${event.id}`} color="orange" >
                    Manage Event
                  </Button>}
                </Segment>
              </Segment.Group>
        );
}

export default EventDetailedHeader;