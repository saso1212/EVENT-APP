import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import format from 'date-fns/format';
import {Segment,Item,Button,Icon,List, Label,} from 'semantic-ui-react'
import EventListAttendee from './EventListAttendee';

class EventListItems extends Component {
    render() {
     const {event,deleteEvent}=this.props;
        return (
                  <div>
                     <Segment.Group style={{margin:"1.5em 0"}}>
                        <Segment>
                          <Item.Group>
                            <Item>
                              <Item.Image size="tiny" circular src={event.hostPhotoURL} />
                              <Item.Content>
                                <Item.Header as="a">{event.title}</Item.Header>
                                <Item.Description>
                                  Hosted by <a href='google.com' alt='alt '>{event.hostedBy}</a>
                                </Item.Description>
                               {event.cancelled && <Label style={{top: '-40px'}} ribbon='right' color='red' content='This event has been cancelled'/>}
                              </Item.Content>
                            </Item>
                          </Item.Group>
                        </Segment>
                        <Segment>
                          <span>
                            <Icon name="clock" /> {format(event.date.toDate(), 'dddd Do MMMM')} at {" "} {format(event.date.toDate(),'HH:mm')}
                            <Icon name="marker" />  {event.venue}
                          </span>
                        </Segment>
                        <Segment secondary>
                        <List horizontal>
                        {event.attendees && 
                        Object.values(event.attendees).map((attendee,index)=>(
                          <EventListAttendee attendee={attendee} key={index} />
                        ))}
                           </List>
                        </Segment>
                        <Segment clearing>
                        <span>{event.description}</span>
                          <Button as={Link} to={`/event/${event.id}`}  color="teal" floated="right" content="View" />
                          <Button as="a" onClick={deleteEvent(event.id)} color="red" floated="right" content="Delete" />
                        </Segment>
                      </Segment.Group>
         </div>
        );
    }
}

export default EventListItems;