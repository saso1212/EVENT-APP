import React, {Component} from 'react';
import Dropzone from 'react-dropzone'
import {connect} from 'react-redux'

import {toastr} from 'react-redux-toastr'
import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase'
import {uploadProfileImage} from '../userActions'
import {Image, Segment, Header, Divider, Grid, Button, Card,Icon} from 'semantic-ui-react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';


class PhotosPage extends Component {
//this is standard setup but for dropzone 4.9.2
    state={
        files:[],
        fieleName:'',
        cropResault:null,
        image:{}
    }
    cropImages=()=>{
        console.log('CANVAS ',this.refs.cropper.getCroppedCanvas())
        console.log('TO DATA URL',this.refs.cropper.getCroppedCanvas().toDataURL())
        if ( typeof this.refs.cropper.getCroppedCanvas()==='undefined'){
            return;
        }
        //toBlob dont support  internet exploder11
        this.refs.cropper.getCroppedCanvas().toBlob(blob=>{
            let imageUrl=URL.createObjectURL(blob);
            console.log(blob);
            console.log(imageUrl);
            this.setState({
                cropResault:imageUrl,
                image:blob
            })
        },"image/jpeg")
    }
    onDrop=files=>{
        this.setState({
            files:files,
            fieleName:files[0].name
        })
    }
    cancleCrop=()=>{
        this.setState({
            files:[],
            image:{}
        })
    }
    uploadImages=async ()=>{
        try{
         await   this.props.uploadProfileImage(this.state.image,this.state.fieleName);
         this.cancleCrop();
         toastr.success('Succes','Photo has been uploaded')
        }catch(error){
            console.log(error);
            toastr.error('Error',error.message);           
        }
    }   
    render() {
        const {profile,photos}=this.props;
        let filteredPhotos;
        if (photos){
            filteredPhotos= photos.filter(photo=>photo.url !== profile.photoURL)
        }
        return (
            <Segment>
                <Header dividing size='large' content='Your Photos' />
                <Grid>
                    <Grid.Row />
                    <Grid.Column width={4}>
                     <Header color='teal' sub content='Step 1 - Add Photo'/>
                    <Dropzone onDrop={this.onDrop} multiple={false}>
                        <div style={{textAlign:'center', marginTop:'30px'}}>
                            <Icon center={true} name='upload' size='huge'  />
                            <Header content='Drop Image or Click to Add'  />
                        </div>
                    </Dropzone>
                    </Grid.Column>
                    <Grid.Column width={1} />
                    <Grid.Column width={4}>
                        <Header sub color='teal' content='Step 2 - Resize image' />
                       {this.state.files[0]  && 
                       <Cropper style={{height:'200px',width:'100%' }}
                        ref='cropper'
                        src={this.state.files[0].preview}
                        aspectRatio={1}
                        viewMode={1}
                        zoomOnWheel={true}
                        guides={false}
                        scalable={true}
                        cropBoxMovable={true}
                        cropBoxResizable={true}
                        responsive={true}
                        dragMode='move'
                        crop={this.cropImages}
                        />}
                    </Grid.Column>
                    <Grid.Column width={1} />
                    <Grid.Column width={4}>
                        <Header sub color='teal' content='Step 3 - Preview and Upload' />
                        {this.state.files[0]  && 
                        <div>
                        <Image style={{minHeight:'200px',minWidth:'200px' }} src={this.state.cropResault}/>
                      <Button.Group>
                          <Button onClick={this.uploadImages} positive style={{width:'100px'}} icon='check'/>
                          <Button onClick={this.cancleCrop} style={{width:'100px'}} icon='close'/>
                      </Button.Group>
                        </div>}
                    </Grid.Column>           
                </Grid>
                <Divider/>
                <Header sub color='teal' content='All Photos'/>

                <Card.Group itemsPerRow={5}>
                    <Card>
                         <Image src={profile.photoURL} />
                        <Button positive>Main Photo</Button>
                    </Card>
                    {photos && filteredPhotos.map(photo=>(
                       <Card key={photo.id}>
                       <Image src={photo.url} />
                       <div className='ui two buttons'>
                           <Button basic color='green'>Main</Button>
                           <Button basic icon='trash' color='red' />
                       </div>
                   </Card>))}
                </Card.Group>
            </Segment>
        );
    }
}

const mapDispatchToProp={
    uploadProfileImage
}
const mapStateToProp=(state)=>{
    return{
        auth:state.firebase.auth,
        profile:state.firebase.profile,
        photos:state.firestore.ordered.photos
    }
}
//auth is the props from mapstatetoprops
const query=({auth})=>{
    return [{
        collection:'users',
        doc:auth.uid,
        subcollections:[{collection:'photos'}],
        //this is haw will store in firebase reducer
        storeAs:'photos'
    }]
}
export default compose(
    //because this is the order first connect then firestoreConnect method
    //firt we will thak the user uid wit map state to props and then use in the method
    connect(mapStateToProp,mapDispatchToProp),
    //we will use method to listen thye files from firestore
    firestoreConnect(auth=>query(auth))
)(PhotosPage);