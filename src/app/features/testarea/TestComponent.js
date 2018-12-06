import React, { Component } from 'react';
import {connect} from 'react-redux';

class TestComponent extends Component {
    render() {
        const {data}=this.props;
        return (
            <div>
                <h1>Test Component</h1>
                <h3>The data is : {data}</h3>
            </div>
        );
    }
}

const mapStateToProp=(state)=>({
    data:state.test.data
})
   
export default connect(mapStateToProp)(TestComponent);