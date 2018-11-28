import React, { Component } from 'react';
import {Menu,Container,Button} from 'semantic-ui-react';
import {NavLink,Link,withRouter} from 'react-router-dom';
import SingedOutMeny from '../Menus/SingedOutMeny';
import SingedInMeny from '../Menus/SingedInMeny';
class Navbar extends Component {
  state={
    autenticated:false
  }
  handleSignIn=()=>{
    this.setState({
      autenticated:true
    })
  }
  handleSignOut=()=>{
    this.setState({
      autenticated:false
    })
    this.props.history.push('/');
  }
    render() {
      const {autenticated}=this.state;
        return (
            <div>
                      <Menu inverted fixed="top">
                        <Container>
                          <Menu.Item as={Link} to='/' header>
                            <img src="/assets/logo.png" alt="logo" />
                            Re-vents
                          </Menu.Item>
                          <Menu.Item as={NavLink} to='/events' name="Events" />
                          { autenticated &&<Menu.Item as={NavLink} to='/people' name="People" />}
                          {autenticated && <Menu.Item>
                            <Button  as={Link} to='createEvents' floated="right" positive inverted content="Create Event" />
                          </Menu.Item>}
                          {autenticated ? (
                          <SingedInMeny  signOut={this.handleSignOut}/>
                          ) :  (
                          <SingedOutMeny signIn={this.handleSignIn}/>
                          )}
                        </Container>
                      </Menu>
            </div>
        );
    }
}

export default withRouter(Navbar);