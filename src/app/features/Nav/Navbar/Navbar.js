import React, { Component } from 'react';
import {Menu,Container,Button} from 'semantic-ui-react';
import {NavLink,Link,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {openModal} from '../../modals/modalActions';
import {logout} from '../../auth/authActions';

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
    this.props.logout()
    this.props.history.push('/');
  }
    render() {
      const {auth}=this.props;
      const authenticated=auth.authenticated;
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
                          { authenticated &&<Menu.Item as={NavLink} to='/people' name="People" />}
                          {authenticated && <Menu.Item>
                            <Button  as={Link} to='/createEvent' floated="right" positive inverted content="Create Event" />
                          </Menu.Item>}
                          {authenticated ? (
                          <SingedInMeny currentUser={auth.currentUser}  signOut={this.handleSignOut}/>
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
    auth:state.auth
  }
}

const mapDispatchToProps={
  openModal,
  logout
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Navbar));