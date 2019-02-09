/*global google */
import React, { Component } from 'react';
import {Segment,Form,Button,Grid,Header} from 'semantic-ui-react';
import {reduxForm, Field} from 'redux-form';
import {composeValidators,combineValidators,isRequired,hasLengthGreaterThan} from 'revalidate';
import Script from 'react-load-script';
import {geocodeByAddress,getLatLng,} from 'react-places-autocomplete';
import {createEvent,updateEvent} from '../eventActions';
import TextInput from '../../../common/form/TextInput';
import TextArea from '../../../common/form/TextArea';
import SelectInput from '../../../common/form/SelectInput';
import DateInput from '../../../common/form/DateInput';
import PlaceInput from '../../../common/form/PlaceInput';
import { cancelToggle} from '../eventActions'
import {connect} from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
// import cuid from 'cuid';


class EventForm extends Component {
  state={
    cityLatLng: {},
    venueLatLng: {},
    scriptLoaded: false
  }

  async componentDidMount(){

    const {firestore, match}=this.props;
    //this is like a get request 
    //with this request in firestore.ordered we take the single event with match id
    //and we get only during componentDidMount
    // let event= await firestore.get(`events/${match.params.id}`);
    //  if(event.exists){
    //    this.setState({
    //      //we must use data() function to take the data from event
    //      venueLatLng:event.data().venueLatLng
    //    })
    //  }
    //with setListener we get the data on every changes
   await firestore.setListener(`events/${match.params.id}`);

  }

  async componentWillUnmount(){
    const {firestore, match}=this.props;
    //beacuse in the firestore in the listener if we dont unlisten it will
    //stay during opening  other pages
    await firestore.unsetListener(`events/${match.params.id}`);

  }

  handleScriptLoaded = () => this.setState({ scriptLoaded: true });

  handleCitySelect = selectedCity => {
    geocodeByAddress(selectedCity)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({
          cityLatLng: latlng
        });
      })
      .then(() => {
        this.props.change('city', selectedCity);
      });
  };


  handleVenueSelect = selectedVenue => {
    geocodeByAddress(selectedVenue)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({
          venueLatLng: latlng
        });
      })
      .then(() => {
        this.props.change('venue', selectedVenue)
      })
  };

   
    onFormSubmit=values=>{
      values.venueLatLng=this.state.venueLatLng;
      console.log(values);
      console.log('initial values',this.props.initialValues.id);
       if (this.props.initialValues.id)
        { 
          if (Object.keys(values.venueLatLng).length === 0) {
          values.venueLatLng = this.props.event.venueLatLng
        }
          this.props.updateEvent(values);
          this.props.history.goBack();
       }
        else
        {
          this.props.createEvent(values)};
          this.props.history.push('/events');
    }
   
   
    render() {
      const category = [
        {key: 'drinks', text: 'Drinks', value: 'drinks'},
        {key: 'culture', text: 'Culture', value: 'culture'},
        {key: 'film', text: 'Film', value: 'film'},
        {key: 'food', text: 'Food', value: 'food'},
        {key: 'music', text: 'Music', value: 'music'},
        {key: 'travel', text: 'Travel', value: 'travel'},
    ];
  
    const {invalid, submitting, pristine,event,cancelToggle} = this.props;
    //pristine is true after anything changes 
        return (
          <Grid>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyB3SNo2WrB-RrvqrtYpCOyeGJhwx35hU-E&libraries=places"
          onLoad={this.handleScriptLoaded}
        />
           <Grid.Column width={10}>
              <Segment style={{margin:"1.5em 0"}}>
              {/* handleSubmit is redux form method */}
                <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
                <Header sub color='teal'  content='Event detailes'/>
                  <Field name='title' type='text' component={TextInput} placeholder='Givr your event a name'/>
                  <Field name='category' 
                  type='text' 
                  options={category}
                  // multiple={true}
                  component={SelectInput} 
                  placeholder='What is your event abouth'/>
                  <Field name='description' 
                  rows={3}
                  type='text'
                   component={TextArea}
                    placeholder='Tell as abouth your event'/>
                  <Header sub color='teal'  content='Event Location Detailes'/>
                  <Field
                    name="city"
                    type="text"
                    component={PlaceInput}
                    options={{ types: ['(cities)'] }}
                    placeholder="Event city"
                    onSelect={this.handleCitySelect}
                  />
                {this.state.scriptLoaded &&
                    <Field
                      name="venue"
                      type="text"
                      component={PlaceInput}
                      options={{
                        location: new google.maps.LatLng(this.state.cityLatLng),
                        radius: 1000,
                        types: ['establishment']
                      }}
                      placeholder="Event venue"
                      onSelect={this.handleVenueSelect}
                 />}
                  <Field 
                    name="date"
                    type="text"
                    component={DateInput}
                    dateFormat='YYYY-MM-DD HH:mm'
                    timeFormat='HH:mm'
                    showTimeSelect
                    placeholder="Date and time of event"
                    />
                    <Button disabled={invalid || pristine || submitting} positive type="submit">
                      Submit
                     </Button>
                    <Button type="button" 
                    onClick={()=>this.props.history.push('/events')}>Cancel</Button>
                     <Button
                      onClick={() => cancelToggle(!event.cancelled, event.id)}
                      type='button'
                      color={event.cancelled ? 'green' : 'red'}
                      floated='right'
                      content={event.cancelled ? 'Reactivate Event' : 'Cancel Event'}
                       />
              </Form>
            </Segment>
          </Grid.Column>
        </Grid>           
        );
    }
}

const mapStateToProp=(state)=>{
 
  let event={};

  if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
    event = state.firestore.ordered.events[0];
  }
  return{
      initialValues:event,
      event:event 
      //just  event
  }
}
const mapDispatchToProps={
  createEvent,
  updateEvent,
  cancelToggle
}
const validate = combineValidators({
  title: isRequired({message: 'The event title is required'}),
  category: isRequired({message: 'Please provide a category'}),
  description: composeValidators(
    isRequired({message: 'Please enter a description'}),
    hasLengthGreaterThan(4)({message: 'Description needs to be at least 5 characters'})
  )(),
  city: isRequired('city'),
  //will put default validation message
  venue: isRequired('venue'),
  date: isRequired('date')
});



export default withFirestore (connect(mapStateToProp,mapDispatchToProps)(reduxForm({form: 'eventForm',enableReinitialize:true,validate})(EventForm)));