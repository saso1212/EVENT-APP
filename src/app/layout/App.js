import React, { Component } from 'react';
import  {Route,Switch} from 'react-router-dom';
import Loadable from 'react-loadable'
import LoadingComponent from './LoadingComponent'
import UserIsAuthenticated from '../features/auth/authWrapper'
import {Container} from 'semantic-ui-react';
import './App.css';

const AsyncHomePage = Loadable({
  loader: () => import('../features/home/HomePage'),
  loading: LoadingComponent
})
const AsyncEventDashboard = Loadable({
  loader: () => import('../features/events/EventDashboard/EventDashboard'),
  loading: LoadingComponent
})
const AsyncNavBar  = Loadable({
  loader: () => import('../features/Nav/Navbar/Navbar'),
  loading: LoadingComponent
})
const AsyncEventForm = Loadable({
  loader: () => import('../features/events/EventForm/EventForm'),
  loading: LoadingComponent
})
const AsyncSettingsDashboard = Loadable({
  loader: () => import('../features/user/Settings/SettingsDashboard'),
  loading: LoadingComponent
})
const AsyncUserDetailedPage = Loadable({
  loader: () => import('../features/user/UserDetailed/UserDetailedPage'),
  loading: LoadingComponent
})
const AsyncPeopleDashboard = Loadable({
  loader: () => import('../features/user/PeopleDashboard/PeopleDashboard'),
  loading: LoadingComponent
})
const AsyncEventDetailedPage = Loadable({
  loader: () => import('../features/events/EventDetailed/EventDetailedPage'),
  loading: LoadingComponent
})
const AsyncModalManager = Loadable({
  loader: () => import('../features/modals/ModalMenager'),
  loading: LoadingComponent
})
const AsyncNotFound = Loadable({
  loader: () => import('./NotFound'),
  loading: LoadingComponent
})

class App extends Component {
  timeApp=()=>{
    setInterval(()=>{
      console.log('Time start');
    },60000);
  }
  render() {
    this.timeApp();
    return (
     <div> 
       <AsyncModalManager/>
       <Switch> 
         <Route exact path='/' component={AsyncHomePage}/> 
       </Switch>
       <Route path='/(.+)' render={()=>(
          <div>
          <AsyncNavBar/>
          <Container className='main'>
         <Switch>
          <Route path='/events' component={AsyncEventDashboard}/>
          <Route path='/event/:id' component={AsyncEventDetailedPage}/>
          {/* protect  if user is not auth */}
          <Route path='/menage/:id' component={UserIsAuthenticated(AsyncEventForm)}/>
          <Route path='/people' component={UserIsAuthenticated(AsyncPeopleDashboard)}/>
          <Route path='/profile/:id' component={UserIsAuthenticated(AsyncUserDetailedPage)}/>
          <Route path='/settings' component={UserIsAuthenticated(AsyncSettingsDashboard)}/>
          <Route path='/createEvent' component={UserIsAuthenticated(AsyncEventForm)}/>
          <Route path='/error' component={AsyncNotFound}/>
          <Route  component={AsyncHomePage}/>
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
