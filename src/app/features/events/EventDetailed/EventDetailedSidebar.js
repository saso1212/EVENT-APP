import React from 'react';
import {Segment,List,Label,Item} from 'semantic-ui-react';

const EventDetailedSidebar = ({attendees}) => {
  const isHosted=false;
    return (
         <div>
            <Segment
              textAlign="center"
              style={{ border: 'none' }}
              attached="top"
              secondary
              inverted
              color="teal"
            >
              {attendees && attendees.length} {attendees.length===1 ? 'Person' : 'People'} Going
            </Segment>
            <Segment attached>
              <List relaxed divided>
                {attendees && attendees.map((ateende)=>
                (<Item key={ateende.id} style={{ position: 'relative' ,display:'flex'}}>
                  {isHosted && <Label
                  style={{ position: 'absolute' }}
                  color="orange"
                  ribbon="right"
                >Hosted
                </Label>}  
                <Item.Image size="tiny" src={ateende.photoURL} circular  />
                <Item.Content >
                  <Item.Header as="h3">
                   <a href>{ateende.name}</a>
                  </Item.Header>
                </Item.Content>
              </Item>)
                )}
              </List>
            </Segment>
          </div>
    );
};

export default EventDetailedSidebar;