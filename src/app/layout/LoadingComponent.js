
import {Loader,Dimmer} from 'semantic-ui-react';
 import React from 'react';
 
 const LoadingComponent = ({inverted}) => {
     return (
       <Dimmer inverted={inverted} active={true}>
            <Loader content='...Loading'/>
       </Dimmer>
     );
 };
 
 export default LoadingComponent;