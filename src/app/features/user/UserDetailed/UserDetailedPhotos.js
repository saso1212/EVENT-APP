import React from 'react'
import {Segment,Grid,Header,Image} from 'semantic-ui-react'

function UserDetailedPhotos({filteredPhotos}) {
  return (
    filteredPhotos && <Grid.Column width={12}>
    <Segment attached>
        <Header icon='image' content='Photos'/>
        <Image.Group size='small'>
        {filteredPhotos.map(photo=>(
    <Image  key={photo.id} src={photo.url} />
        ))}              
        </Image.Group>
    </Segment>
</Grid.Column>
 
  )
}

export default UserDetailedPhotos
