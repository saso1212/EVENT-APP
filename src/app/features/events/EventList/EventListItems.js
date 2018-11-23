import React, { Component } from 'react';
import {Segment,Item,Button,Icon,List} from 'semantic-ui-react'
import EventListAttendee from './EventListAttendee';

class EventListItems extends Component {
    render() {
     
        return (
                  <div>
                     <Segment.Group style={{margin:"1.5em 0"}}>
                        <Segment>
                          <Item.Group>
                            <Item>
                              <Item.Image size="tiny" circular src={this.props.events.hostPhotoURL} />
                              <Item.Content>
                                <Item.Header as="a">{this.props.events.title}</Item.Header>
                                <Item.Description>
                                  Hosted by <a href='google.com' alt='alt '>{this.props.events.hostedBy}</a>
                                </Item.Description>
                              </Item.Content>
                            </Item>
                          </Item.Group>
                        </Segment>
                        <Segment>
                          <span>
                            <Icon name="clock" /> {this.props.events.date} |
                            <Icon name="marker" />  {this.props.events.venue}
                          </span>
                        </Segment>
                        <Segment secondary>
                        <List horizontal>
                        {this.props.events.attendees && this.props.events.attendees.map((attendee)=>(
                          <EventListAttendee attendee={attendee} key={attendee.id} />
                        ))}
                           </List>
                        </Segment>
                        <Segment clearing>
                        <span>{this.props.events.description}</span>
                          <Button as="a" color="teal" floated="right" content="View" />
                        </Segment>
                      </Segment.Group>
         </div>
        );
    }
}

export default EventListItems;