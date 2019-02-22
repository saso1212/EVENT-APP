import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Grid,Loader} from 'semantic-ui-react';
// binding alaow as to conect to firebase and his hireorder component
import {firestoreConnect} from 'react-redux-firebase';
import EventList from '../EventList/EventList';
import {getEventsForDashboard} from '../eventActions'
import LoadingComponent from '../../../layout/LoadingComponent';
import EventActivity from '../EventActivity/EventActivity';


class EventDashboard extends Component {
  state = {
    moreEvents: false,
    //loadingInitial is a loading flag
    loadingInitial: true,
    // keep the events  in the local state loadedEvents: []
    loadedEvents: [], 
    contextRef:{}
  };

  async componentDidMount() {
    let next = await this.props.getEventsForDashboard();
    console.log(next);

    if (next && next.docs && next.docs.length > 1) {
      this.setState({
        moreEvents: true,
        loadingInitial: false,
       
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.events !== nextProps.events) {
      this.setState({
        //copy the old events and insert the new one that will reseved by props
        loadedEvents: [...this.state.loadedEvents, ...nextProps.events]
      });
    }
  }

//
  getNextEvents = async () => {
    const { events } = this.props;
    //take the last event
    let lastEvent = events && events[events.length - 1];
    console.log('last events',lastEvent);
    let next = await this.props.getEventsForDashboard(lastEvent);
    console.log('next events',next);
    //if there is no events eny more
    if (next && next.docs && next.docs.length <= 1) {
      this.setState({
        moreEvents: false
      });
    }
  };
  handleContextRef = contextRef => this.setState({contextRef})
  handleDeleteEvent=(eventId)=>()=>{
    this.props.deleteEvent(eventId)
  }
     render() {
      const { loading,activities } = this.props;
      const { moreEvents, loadedEvents,contextRef } = this.state;
      if (this.state.loadingInitial) return <LoadingComponent inverted={true} />;
  
      return (
        <Grid>
          <Grid.Column width={10}>
          {/* handle contetxt refi is nethod to witch Event activity will be placed 
          position fixed in some way */}
          <div ref={this.handleContextRef}>
          <EventList
            loading={loading}
            moreEvents={moreEvents}
            events={loadedEvents}
            getNextEvents={this.getNextEvents}
          />
          </div>
          </Grid.Column>
          <Grid.Column width={6}>
          {/* contextRef is the ref in withc will be stycki  the element */}
            <EventActivity  activities={activities} contextRef={contextRef}/>
          </Grid.Column>
          <Grid.Column width={10}>
            <Loader active={loading}/>
          </Grid.Column>
        </Grid>
      );
    }
}

const query = [
  {
    collection: 'activity',
    orderBy: ['timestamp', 'desc'],
    limit: 5
  }
]

const mapStateToProps=(state)=>{
  return {
    //events:state.firestore.ordered.events,
   // loading:state.async.loading
   events: state.events,
   loading: state.async.loading,
   activities:state.firestore.ordered.activity
  }
}
const mapDispatchToProps={
    getEventsForDashboard
}
// with this hire-order component we are lisaianing firebase not get date but lisening
export default connect(mapStateToProps,mapDispatchToProps)(
  //firestoreConnect metod we are lissening to the event
  firestoreConnect(query)(EventDashboard)
  );



