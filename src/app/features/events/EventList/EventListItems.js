import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import format from 'date-fns/format';
import {Segment,Item,Button,Icon,List, Label,} from 'semantic-ui-react'
import EventListAttendee from './EventListAttendee';
import { objectToArray} from '../../../common/utility/helpers'

class EventListItems extends Component {
    render() {
     const {event}=this.props;
        return (
                  <div>
                     <Segment.Group style={{margin:"1.5em 0"}}>
                        <Segment>
                          <Item.Group>
                            <Item>
                              <Item.Image size="tiny" circular src={event.hostPhotoURL} />
                              <Item.Content>
                                <Item.Header as={Link} to={`/event/${event.id}`}>{event.title}</Item.Header>
                                <Item.Description>
                                  Hosted by <Link to={`/propfile/${event.hostedUid}`}>{event.hostedBy}</Link>
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
                        objectToArray(event.attendees).map((attendee)=>(
                          <EventListAttendee attendee={attendee} key={attendee.id} />
                        ))}
                           </List>
                        </Segment>
                        <Segment clearing>
                        <span>{event.description}</span>
                          <Button as={Link} to={`/event/${event.id}`}  color="teal" floated="right" content="View" />
                        </Segment>
                      </Segment.Group>
         </div>
        );
    }
}

export default EventListItems;