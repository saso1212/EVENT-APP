import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { firestoreConnect, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux'
import UserDetailedHeader from './UserDetailedHeader'
import UserDetailedDescription from './UserDetailedDescription'
import UserDetailedPhotos from './UserDetailedPhotos'
import UserDetailedSidebar from './UserDetailedSidebar'
import UserDetailedEvents from './UserDetailedEvents'
import { userDetailedQuery } from '../userQueries'
import LoadingComponent from '../../../layout/LoadingComponent'
import { getUserEvents } from '../userActions'

const mapStateToProps = (state, ownProps) => {
  let userUid = null;
  let profile = {};

  if (ownProps.match.params.id === state.auth.uid) {
    profile = state.firebase.profile
  } else {
    profile = !isEmpty(state.firestore.ordered.profile) && state.firestore.ordered.profile[0];
    userUid = ownProps.match.params.id;
  }
  return {
    profile,
    userUid,
    events: state.events,
    eventsLoading: state.async.loading,
    auth: state.firebase.auth,
    photos: state.firestore.ordered.photos,
    requesting: state.firestore.status.requesting
  }
}
const mapDispatchToProps = {
  getUserEvents
}

class UserDetailedPage extends Component {

  async componentDidMount() {
    let events = await this.props.getUserEvents(this.props.userUid);
    console.log('user detailed Page',events);
  }

  changeTab = (e, data) => {
    console.log(data);
    //in the data with clicking the tab we have activeIndex in the data activeIndex=1,.....
    //so we can use in the get user event
    this.props.getUserEvents(this.props.userUid, data.activeIndex)
  }

  render() {
    const {profile, photos, auth, match, requesting,events,eventsLoading} = this.props;
    const isCurrentUser = auth.uid === match.params.id;
    const loading = Object.values(requesting).some(a => a === true);

    if (loading) return <LoadingComponent inverted={true}/>
    return (
      <Grid>
        <UserDetailedHeader profile={profile}/>
        <UserDetailedDescription profile={profile}/>
        <UserDetailedSidebar isCurrentUser={isCurrentUser}/>
        {photos && photos.length > 0 &&
        <UserDetailedPhotos photos={photos}/>}
        <UserDetailedEvents changeTab={this.changeTab} events={events} eventsLoading={eventsLoading}/>
      </Grid>
    );
  }
}

export default compose(
  connect(mapStateToProps,mapDispatchToProps),
  //we take the data by the query
  firestoreConnect((auth, userUid) => userDetailedQuery(auth, userUid)),
)(UserDetailedPage);
