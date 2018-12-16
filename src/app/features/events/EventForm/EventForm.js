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
import {connect} from 'react-redux';
import moment from 'moment';
import cuid from 'cuid';


class EventForm extends Component {
  state={
    cityLatLng: {},
    venueLatLng: {},
    scriptLoaded: false
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
        this.props.change('city', selectedCity)
      })
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
      values.date = moment(values.date).format();
      values.venueLatLng=this.state.venueLatLng;
      console.log(values);
      console.log('initial values',this.props.initialValues.id);
       if (this.props.initialValues.id)
        {this.props.updateEvent(values);
        this.props.history.goBack();
       }
        else
        {
          const newEvent={
            ...values,
            id:cuid(),
            hostPhotoURL:'/assets/user.png',
            hostedBy:'Bob',
            attendees:[]
          }
          this.props.createEvent(newEvent)};
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
  
    const {invalid, submitting, pristine} = this.props;
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
              </Form>
            </Segment>
          </Grid.Column>
        </Grid>           
        );
    }
}

const mapStateToProp=(state,ownProps)=>{
  const eventId=ownProps.match.params.id;
  let event={};

  if(eventId && state.events.length>0){
      event=state.events.filter(event=>event.id === eventId)[0]
  }
  return{
      initialValues:event
  }
}
const mapDispatchToProps={
  createEvent,
  updateEvent
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



export default connect(mapStateToProp,mapDispatchToProps)(reduxForm({form: 'eventForm',enableReinitialize:true,validate})(EventForm));