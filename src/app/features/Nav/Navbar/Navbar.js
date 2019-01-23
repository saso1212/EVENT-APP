import React, { Component } from 'react';
import {Menu,Container,Button} from 'semantic-ui-react';
import {NavLink,Link,withRouter} from 'react-router-dom';
import {withFirebase} from 'react-redux-firebase'
import {connect} from 'react-redux';
import {openModal} from '../../modals/modalActions';

import SingedOutMeny from '../Menus/SingedOutMeny';
import SingedInMeny from '../Menus/SingedInMeny';

class Navbar extends Component {
  
  handleSignIn=()=>{
   this.props.openModal("LoginModal")
  }

  handleRegister=()=>{
    this.props.openModal('RegisterModal')
  }
  handleSignOut=()=>{
    //this is function that we have using withFirabase
    this.props.firebase.logout()
    this.props.history.push('/');
  }
    render() {
      const {auth,profile}=this.props;
      const authenticated=auth.isLoaded && !auth.isEmpty;
        return (
            <div>
                      <Menu inverted fixed="top">
                        <Container>
                          <Menu.Item as={Link} to='/' header>
                            <img src="/assets/logo.png" alt="logo" />
                            Re-vents
                          </Menu.Item>
                          <Menu.Item as={NavLink} to='/events' name="Events" />
                          <Menu.Item as={NavLink} to='/test' name="TestArea" />
                          <Menu.Item as={NavLink} to='/userDetailed' name='userDetailed'/>
                          { authenticated &&<Menu.Item as={NavLink} to='/people' name="People" />}
                          {authenticated && <Menu.Item>
                            <Button  as={Link} to='/createEvent' floated="right" positive inverted content="Create Event" />
                          </Menu.Item>}
                          {authenticated ? (
                          <SingedInMeny profile={profile}  signOut={this.handleSignOut}/>
                          ) :  (
                          <SingedOutMeny signIn={this.handleSignIn} register={this.handleRegister}/>
                          )}
                        </Container>
                      </Menu>
            </div>
        );
    }
}
const mapStateToProps=(state)=>{
  return{
    auth:state.firebase.auth,
    profile:state.firebase.profile
  }
}

const mapDispatchToProps={
  openModal
}

//setup to use firebase functionality
export default withRouter(withFirebase(connect(mapStateToProps,mapDispatchToProps)(Navbar)));