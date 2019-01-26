import React, {Component} from 'react';
import {Button, Card, Grid, Header, Icon, Image, Item, List, Menu, Segment} from "semantic-ui-react";
import {connect} from 'react-redux'
import {compose} from 'redux'
import Auxilary from '../../../common/huc/Auxilary'
import {firestoreConnect} from 'react-redux-firebase'
import differenceInYears from 'date-fns/difference_in_years'
import format from 'date-fns/format';


class UserDetailedPage extends Component {
    

    render() {
        
        const {profile,photos,history}=this.props;
        let date;
        if (profile.createdAt){
            date=format(profile.createdAt.toDate(),'dddd Do MMMM')
        }
        else{
            date='uknown age'
        }
      
        let age;
        if (profile.dateOfBirth){
            age=differenceInYears(Date.now(), profile.dateOfBirth.toDate())
        }
        else{
            age='uknown age'
        }

        return (
            <Grid>
                <Grid.Column width={16}>
                    <Segment>
                        <Item.Group>
                            <Item>
                                <Item.Image avatar size='small' src={profile.photoURL || '/assets/user.png'}/>
                                <Item.Content verticalAlign='bottom'>
                                    <Header as='h1'>{profile.displayName}</Header>
                                    <br/>
                                  {profile.occupation &&  <Header as='h3'>{profile.occupation}</Header>}
                                    <br/>
                                   {profile && <Header as='h3'>{age}, {profile.city}</Header>}
                                </Item.Content>
                            </Item>
                        </Item.Group>

                    </Segment>
                </Grid.Column>
                <Grid.Column width={12}>
                    <Segment>
                        <Grid >
                            <Grid.Column width={10}>
                                <Header icon='smile' content={profile.displayName}/>
                                <p>I am a: <strong>{profile.occupation ? profile.occupation : 'tbn'}</strong></p>
                                <p>Originally from <strong>{profile.origin ? profile.origin : 'tbn'}</strong></p>
                              <p>Member Since: <strong>{date}</strong></p>
                                <p>{profile.about && profile.about}</p>

                            </Grid.Column>
                            <Grid.Column width={6}>
                                <Header icon='heart outline' content='Interests'/>
                                <List>
                                    <Item>   
                                        {profile.interests ? profile.interests.map((interest)=>(   
                                            <Auxilary key={interest}> 
                                                <Icon name='heart'/>
                                                <Item.Content  ><strong>{interest}</strong></Item.Content>  
                                                <br/>    
                                            </Auxilary>
                                        )) : null}
                                    </Item>
                                </List>
                            </Grid.Column>
                        </Grid>
                    </Segment>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Segment>
                        <Button onClick={()=>history.push('/settings/basic')} color='teal' fluid basic content='Edit Profile'/>
                    </Segment>  
                </Grid.Column>

              {photos ? <Grid.Column width={12}>
                        <Segment attached>
                            <Header icon='image' content='Photos'/>
                            <Image.Group size='small'>
                            {photos.map(photo=>(
                        <Image  key={photo.id} src={photo.url} />
                            ))}              
                            </Image.Group>
                        </Segment>
                </Grid.Column> : null}
                <Grid.Column width={12}>
                    <Segment attached>
                        <Header icon='calendar' content='Events'/>
                        <Menu secondary pointing>
                            <Menu.Item name='All Events' active/>
                            <Menu.Item name='Past Events'/>
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
            </Grid>

        );
    }
}

const mapStateToProprs=state=>{
    return{
        auth:state.firebase.auth,
        profile:state.firebase.profile, 
        photos:state.firestore.ordered.photos,
    }
}
const query=({auth})=>{
    return [{
        collection:'users',
        doc:auth.uid,
        subcollections:[{collection:'photos'}],
        //this is haw will store in firebase reducer
        storeAs:'photos'
    }]
}

export default compose(
    connect(mapStateToProprs),
    firestoreConnect(auth=>query(auth))
    )(UserDetailedPage);