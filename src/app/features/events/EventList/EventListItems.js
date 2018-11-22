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
                              <Item.Image size="tiny" circular src="https://randomuser.me/api/portraits/women/42.jpg" />
                              <Item.Content>
                                <Item.Header as="a">Event Title</Item.Header>
                                <Item.Description>
                                  Hosted by <a>hosted by</a>
                                </Item.Description>
                              </Item.Content>
                            </Item>
                          </Item.Group>
                        </Segment>
                        <Segment>
                          <span>
                            <Icon name="clock" /> date |
                            <Icon name="marker" /> time
                          </span>
                        </Segment>
                        <Segment secondary>
                        <List horizontal>
                          <EventListAttendee/>
                          <EventListAttendee/>
                          <EventListAttendee/>
                           </List>
                        </Segment>
                        <Segment clearing>
                        <span>description of the users</span>
                          <Button as="a" color="teal" floated="right" content="View" />
                        </Segment>
                      </Segment.Group>
            </div>
        );
    }
}

export default EventListItems;