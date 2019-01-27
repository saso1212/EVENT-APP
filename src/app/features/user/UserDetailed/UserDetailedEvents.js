import React from 'react'
import {NavLink} from 'react-router-dom'
import {Grid,Header,Menu,Card,Image,Segment} from 'semantic-ui-react'

function UserDetailedEvents({auth}) {
  return (
    <Grid.Column width={12}>
    <Segment attached>
        <Header icon='calendar' content='Events'/>
        <Menu secondary pointing>
            <Menu.Item as={NavLink} to={`/profile/${auth.uid}`} name='All Events' />
            <Menu.Item  as={NavLink} to={'/settings'} name='Past Events'/>
            <Menu.Item name='Future Events'/>
            <Menu.Item name='Events Hosted'/>
        </Menu>

        <Card.Group itemsPerRow={5}>

            <Card>
                <Image src={'/assets/categoryImages/drinks.jpg'}/>
                <Card.Content>
                    <Card.Header textAlign='center'>
                        Event Title
                    </Card.Header>
                    <Card.Meta textAlign='center'>
                        28th March 2018 at 10:00 PM
                    </Card.Meta>
                </Card.Content>
            </Card>

            <Card>
                <Image src={'/assets/categoryImages/drinks.jpg'}/>
                <Card.Content>
                    <Card.Header textAlign='center'>
                        Event Title
                    </Card.Header>
                    <Card.Meta textAlign='center'>
                        28th March 2018 at 10:00 PM
                    </Card.Meta>
                </Card.Content>
            </Card>

        </Card.Group>
    </Segment>
</Grid.Column>
  )
}

export default UserDetailedEvents
