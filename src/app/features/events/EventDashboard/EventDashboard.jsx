import React, { Component } from 'react';
import {Grid, GridColumn} from 'semantic-ui-react';
import EventList from '../EventList/EventList';

class EventDashboard extends Component {
    render() {
        return (
          <Grid>
              <GridColumn width={10}><EventList/></GridColumn>
              <GridColumn width={6}>Right Colom</GridColumn>
          </Grid>
        );
    }
}

export default EventDashboard;



