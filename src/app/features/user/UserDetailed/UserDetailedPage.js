import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { firestoreConnect, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux'
import {toastr} from 'react-redux-toastr'
import UserDetailedHeader from './UserDetailedHeader'
import UserDetailedDescription from './UserDetailedDescription'
import UserDetailedPhotos from './UserDetailedPhotos'
import UserDetailedSidebar from './UserDetailedSidebar'
import UserDetailedEvents from './UserDetailedEvents'
import { userDetailedQuery } from '../userQueries'
import LoadingComponent from '../../../layout/LoadingComponent'
import { getUserEvents,unFollowUser,followUser} from '../userActions'


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
    requesting: state.firestore.status.requesting,
    following: state.firestore.ordered.following,
   
  }
}
const mapDispatchToProps = {
  getUserEvents,
  followUser,
  unFollowUser
}

class UserDetailedPage extends Component {

  async componentDidMount() {

    let user = await this.props.firestore.get(`users/${this.props.match.params.id}`);
    if (!user.exists) {
      toastr.error('Not found', 'This is not the user you are looking for')
      this.props.history.push('/error')
    }
    let events = await this.props.getUserEvents(this.props.userUid);
    console.log(events);
    // let events = await this.props.getUserEvents(this.props.userUid);
    // console.log('user detailed Page',events);
  }

  changeTab = (e, data) => {
    console.log(data);
    //in the data with clicking the tab we have activeIndex in the data activeIndex=1,.....
    //so we can use in the get user event
    this.props.getUserEvents(this.props.userUid, data.activeIndex)
  }

  render() {
    const {profile, photos, auth, match,unFollowUser, requesting,events,eventsLoading,followUser,following} = this.props;
    const isCurrentUser = auth.uid === match.params.id;
    const loading = requesting[`users/${match.params.id}`]
   // const loading = Object.values(requesting).some(a => a === true);
    //when I want to now is there is nothing in that collection I must use isEmpty
    const isFollowing = !isEmpty(following)
  //  console.log(isFollowing)

    if (loading) return <LoadingComponent inverted={true}/>
    return (
      <Grid>
        <UserDetailedHeader profile={profile}/>
        <UserDetailedDescription profile={profile}/>
        <UserDetailedSidebar isCurrentUser={isCurrentUser} unFollowUser={unFollowUser} isFollowing={isFollowing} profile={profile} match={match} followUser={followUser}/>
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
  //match is state from routing
  //take all documet that we need in query from firestore
  firestoreConnect((auth, userUid,match) => userDetailedQuery(auth, userUid,match)),
)(UserDetailedPage);
