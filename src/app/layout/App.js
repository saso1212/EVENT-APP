import React, { Component } from 'react';
import  {Route,Switch} from 'react-router-dom';
import HomePage from '../features/home/HomePage';
import EventDetailedPage from '../features/events/EventDetailed/EventDetailedPage';
import PeopleDashboard from '../features/user/PeopleDashboard/PeopleDashboard';
import UserDetailedPage from '../features/user/UserDetailed/UserDetailedPage';
import EventDashboard from '../features/events/EventDashboard/EventDashboard';
import EventForm from '../features/events/EventForm/EventForm';
import SettingsDashboard from '../features/user/Settings/SettingsDashboard';
import NavBar from '../features/Nav/Navbar/Navbar';
import {Container} from 'semantic-ui-react';
import TestComponent from '../features/testarea/TestComponent';
import ModalMenager from '../features/modals/ModalMenager';
import './App.css';

class App extends Component {
  timeApp=()=>{
    setInterval(()=>{
      console.log('Time start');
    },600000);
  }
  render() {
    this.timeApp();
    return (
     <div> 
       <ModalMenager/>
       <Switch> 
         <Route exact path='/' component={HomePage}/> 
       </Switch>
       <Route path='/(.+)' render={()=>(
          <div>
          <NavBar/>
          <Container className='main'>
         <Switch>
          <Route path='/events' component={EventDashboard}/>
          <Route path='/event/:id' component={EventDetailedPage}/>
          <Route path='/menage/:id' component={EventForm}/>
          <Route path='/people' component={PeopleDashboard}/>
          <Route path='/profile/:id' component={UserDetailedPage}/>
          <Route path='/settings' component={SettingsDashboard}/>
          <Route path='/createEvent' component={EventForm}/>
          <Route path='/test' component={TestComponent}/>
        </Switch>
       </Container>
        </div>
       )}
       />
       </div>
    )
  }
}

export default App;
