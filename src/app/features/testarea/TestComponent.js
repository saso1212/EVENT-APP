import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Icon,Button} from 'semantic-ui-react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import Script from 'react-load-script';
import GoogleMapReact from 'google-map-react';
import {modalOpen}  from '../modals/modalActions';



const Marker=()=><Icon name='marker' size='big' color='red'/>
class TestComponent extends Component {
    state = { 
        address:"",
        scriptLoaded:false 
    }
    static defaultProps = {
        center: {
          lat: 59.95,
          lng: 30.33
        },
        zoom: 11
      };

     onChange = (address) => this.setState({ address });

     handleScriptLoad=()=>this.setState({scriptLoaded:true});   

     handleFormSubmit = (event) => {
        event.preventDefault()
        geocodeByAddress(this.state.address)
          .then(results => getLatLng(results[0]))
          .then(latLng => console.log('Success', latLng))
          .catch(error => console.error('Error', error))
      }
    render() {
        const {data,modalOpen}=this.props;
        const inputProps = {
            value: this.state.address,
            onChange: this.onChange,
          }
        return (
            <div>
                {/* enable to input jasva script files  
                <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places"></script>*/}
                <Script url='https://maps.googleapis.com/maps/api/js?key= AIzaSyB3SNo2WrB-RrvqrtYpCOyeGJhwx35hU-E&libraries=places'
                 onLoad={this.handleScriptLoad}/>
                <h1>Test Component</h1>
                <h3>The data is : {data}</h3>
                <form onSubmit={this.handleFormSubmit}>
                {this.state.scriptLoaded && <PlacesAutocomplete inputProps={inputProps} />}
                    <button type="submit">Submit</button>
                    <br/>
                    <Button onClick={()=>modalOpen('TestModal',{data:45})} color='teal' content="Modal Open" />
                </form>
                <div style={{ height: '300px', width: '100%' }}>
                    <GoogleMapReact
                    bootstrapURLKeys={{ key:'AIzaSyB3SNo2WrB-RrvqrtYpCOyeGJhwx35hU-E' }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    >
                    <Marker
                        lat={59.955413}
                        lng={30.337844}
                        text={'Kreyser Avrora'}
                    />
                    </GoogleMapReact>
                </div>
                
            </div>
            
        );
    }
}

const mapStateToProp=(state)=>({
    data:state.test.data
})
const mapDispatchToProps={
    modalOpen
}
   
export default connect(mapStateToProp,mapDispatchToProps)(TestComponent);