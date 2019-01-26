import React from 'react'
import {Grid,Segment,Image,Button,Header,Icon,Card,Menu,Container} from 'semantic-ui-react'
import {NavLink,withRouter} from 'react-router-dom'
import {firestoreConnect} from 'react-redux-firebase'
import {connect} from 'react-redux'


const PersonDetailedPage = ({history,users}) => {
  console.log(users)
  return (
  <Grid>
      <Grid.Row>
          <Grid.Column width={16}>
          <Segment>  
             <Grid>
                 <Grid.Column width={3}>
                 {users && <Image verticalAlign='middle' circular size='small' src={users[0].photoURL ||'/assets/user.png'} />}
                 </Grid.Column>
                 <Grid.Column width={3}>
                   <div style={{marginTop:'30%'}}>
                       <h1>Saso</h1>
                       <h3>Software Developer, 30  Lives in Skopje</h3>
                   </div>
                 </Grid.Column>
             </Grid>
      </Segment>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
    <Grid.Column width={12}>
        <Segment>
        <Grid>
            <Grid.Column width={10}>
            <Header>
            <Icon  name='smile' />Abouth Bruce
            </Header>
            <div>
               <div>I am a <b>Sowtvare ingeneer</b></div> <br/>
               <div>Originally from <b>Skopje</b></div> <br/>
               <div>Memeber Sinece<b>10 Marth 2018 </b></div> <br/>
               <div>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.</div>
            </div>
            </Grid.Column>
            <Grid.Column width={6}>
            <Header><Icon name='heart outline' />Interset</Header>
            <div>
               <div><Icon name='heart'/>Intrest1</div> 
               <div><Icon name='heart'/>Intrest2</div> 
               <div><Icon name='heart'/>Intrest3</div> 
            </div>
            </Grid.Column>
        </Grid>
        </Segment>
       </Grid.Column>
       <Grid.Column  floated='right' width={4}>
       <Segment>
       <Button style={{width:'100%'}} onClick={()=>history.push('/settings/basic')} basic>Edit Profile</Button>
       </Segment>
       </Grid.Column>
    </Grid.Row>
    <Grid.Row>
        <Grid.Column width={12}>
            <Segment>
            <Header><Icon  name='picture' />Photos</Header>
            <Card.Group itemsPerRow={5}>
                    <Card>
                          <Image src= '/assets/user.png' />
                    </Card>
                </Card.Group>
            </Segment>
        </Grid.Column>
    </Grid.Row>
    <Grid.Row>
        <Grid.Column width={12}>
            <Segment>
            <Header><Icon  name='calendar' />Events</Header>
            <Menu pointing secondary>
                <Container>
                <Menu.Item as={NavLink} to='/allEvents' name="All Events"/>
                <Menu.Item as={NavLink} to='/featureEvents' name="Feature Events"/>
                <Menu.Item as={NavLink} to='/pastEvents' name="Past Events"/>
                <Menu.Item as={NavLink} to='/hostedEvents' name="Hosted Events"/>
                </Container>
            </Menu>
            <Card.Group itemsPerRow={5}>
                    <Card>
                          <Image src= '/assets/user.png' />
                          <Card.Content>
                            <Card.Header>An Events</Card.Header>
                            <Card.Meta>10 Marth 2018</Card.Meta>
                            </Card.Content>
                    </Card>
                    <Card>
                          <Image src= '/assets/user.png' />
                          <Card.Content>
                            <Card.Header>An Events</Card.Header>
                            <Card.Meta>10 Marth 2018</Card.Meta>
                            </Card.Content>
                    </Card>
                    <Card>
                          <Image src= '/assets/user.png' />
                          <Card.Content>
                            <Card.Header>An Events</Card.Header>
                            <Card.Meta>10 Marth 2018</Card.Meta>
                            </Card.Content>
                    </Card>
                </Card.Group>
            </Segment>
        </Grid.Column>
    </Grid.Row>
   </Grid>
   
  )
}
const mapStateToProps=state=>{
    return{
        users:state.firestore.ordered.users
    }
}

export default withRouter(connect(mapStateToProps)(firestoreConnect([{collection:'users'},{collection:'events'}])(PersonDetailedPage)));
