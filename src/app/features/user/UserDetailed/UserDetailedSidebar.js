import React from 'react';
import { Button, Grid, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const UserDetailedSidebar = ({ isCurrentUser,profile,followUser,isFollowing,unFollowUser }) => {
  return (
    <Grid.Column width={4}>
      <Segment>
        {isCurrentUser && 
          <Button
            as={Link}
            to="/settings"
            color="teal"
            fluid
            basic
            content="Edit Profile"
        /> }
        {!isCurrentUser &&  !isFollowing && <Button color="teal" onClick={()=>followUser(profile)} fluid basic content="Follow user" />}
        {!isCurrentUser &&  isFollowing && <Button color="teal" onClick={()=>unFollowUser(profile)} fluid basic content="Unfollow user" />}
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailedSidebar;