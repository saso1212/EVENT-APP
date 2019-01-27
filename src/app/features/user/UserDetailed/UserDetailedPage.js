import React, {Component} from 'react';
import {Button, Grid, Header, Icon,  Item, List, Segment} from "semantic-ui-react";
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase'
import UserDetailedPhotos from './UserDetailedPhotos'
import UserDetailedEvents from './UserDetailedEvents'
import differenceInYears from 'date-fns/difference_in_years'
import format from 'date-fns/format';


class UserDetailedPage extends Component {
    

    render() {
        const {profile,photos,auth}=this.props;
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
        let filteredPhotos;
        if (photos){
            filteredPhotos= photos.filter(photo=>photo.url !== profile.photoURL)
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
                                <p>I am a: <strong>{ profile.occupation || 'tbn'}</strong></p>
                                <p>Originally from <strong>{ profile.origin|| 'tbn'}</strong></p>
                              <p>Member Since: <strong>{date}</strong></p>
                                <p>{profile.about && profile.about}</p>
                            </Grid.Column>
                            <Grid.Column width={6}>
                                <Header icon='heart outline' content='Interests'/>
                                <List>
                                      
                                        {profile.interests ? profile.interests.map((interest)=>(   
                                            <Item key={interest}> 
                                                <Icon name='heart'/>
                                                <Item.Content  ><strong>{interest}</strong></Item.Content>    
                                                </Item>
                                        )) : <p>No Interests</p>}
                                </List>
                            </Grid.Column>
                        </Grid>
                    </Segment>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Segment>
                        <Button as={Link} to={'/settings'}  color='teal' fluid basic content='Edit Profile'/>
                    </Segment>  
                </Grid.Column>
                {filteredPhotos && <UserDetailedPhotos  filteredPhotos={filteredPhotos}/>}
                <UserDetailedEvents auth={auth}/>
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