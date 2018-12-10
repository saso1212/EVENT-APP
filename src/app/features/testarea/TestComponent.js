import React, { Component } from 'react';
import {connect} from 'react-redux';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import Script from 'react-load-script';

class TestComponent extends Component {
    state = { 
        address:"",
        scriptLoaded:false }

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
        const {data}=this.props;
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
                </form>
            </div>
        );
    }
}

const mapStateToProp=(state)=>({
    data:state.test.data
})
   
export default connect(mapStateToProp)(TestComponent);