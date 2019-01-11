import React, {Component} from 'react';
import Dropzone from 'react-dropzone'
import {Image, Segment, Header, Divider, Grid, Button, Card,Icon} from 'semantic-ui-react';

class PhotosPage extends Component {
//this is standard setup but for dropzone 4.9.2
    state={
        files:[],
        fieleName:''
    }
    onDrop=files=>{
        this.setState({
            files:files,
            fieleName:files[0].name
        })
    }
    render() {
        return (
            <Segment>
                <Header dividing size='large' content='Your Photos' />
                <Grid>
                    <Grid.Row />
                    <Grid.Column width={4}>
                     <Header color='teal' sub content='Step 1 - Add Photo'/>
                    <Dropzone onDrop={this.onDrop} multiple={false}>
                        <div style={{textAlign:'center', marginTop:'30px'}}>
                            <Icon ceter name='upload' size='huge'  />
                            <Header content='Drop Image or Click to Add'  />
                        </div>
                    </Dropzone>
                    </Grid.Column>
                    <Grid.Column width={1} />
                    <Grid.Column width={4}>
                        <Header sub color='teal' content='Step 2 - Resize image' />
                    </Grid.Column>
                    <Grid.Column width={1} />
                    <Grid.Column width={4}>
                        <Header sub color='teal' content='Step 3 - Preview and Upload' />
                        {this.state.files[0]  && 
                        <Image style={{minHeight:'200px',minWidth:'200px' }} src={this.state.files[0].preview}/>}
                    </Grid.Column>
           
                </Grid>

                <Divider/>
                <Header sub color='teal' content='All Photos'/>

                <Card.Group itemsPerRow={5}>
                    <Card>
                        <Image src='https://randomuser.me/api/portraits/men/20.jpg'/>
                        <Button positive>Main Photo</Button>
                    </Card>

                        <Card >
                            <Image
                                src='https://randomuser.me/api/portraits/men/20.jpg'
                            />
                            <div className='ui two buttons'>
                                <Button basic color='green'>Main</Button>
                                <Button basic icon='trash' color='red' />
                            </div>
                        </Card>
                </Card.Group>
            </Segment>
        );
    }
}

export default PhotosPage;