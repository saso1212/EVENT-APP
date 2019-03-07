import React, {Component} from 'react';
import Dropzone from 'react-dropzone'
import {connect} from 'react-redux'
// import user from '../../../../assets/images/user.png';
import {toastr} from 'react-redux-toastr'
import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase'
import {uploadProfileImage,deletePhoto,setMainPhoto} from '../userActions'
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

    handlePhotoDelete=  (photo)=>async ()=>{
        try{
            this.props.deletePhoto(photo);
            toastr.success('Succes','Photo has been deleted');
        }
        catch(error){
            console.log(error);
            toastr.error('Error',error.message);   
        }
    }
    handleSetMainPhoto= (photo)=> async()=>{
        try{
            await this.props.setMainPhoto(photo)
            toastr.success('Succes','Main Photo has been updated');
        }catch(error){
            toastr.error('Error',error.message);   
        }
    }

    render() {
        const {profile,photos,loading}=this.props;
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
                          <Button onClick={this.uploadImages} positive style={{width:'100px'}} loading={loading} icon='check'/>
                          <Button disabled={loading} onClick={this.cancleCrop} style={{width:'100px'}} icon='close'/>
                      </Button.Group>
                        </div>}
                    </Grid.Column>           
                </Grid>
                <Divider/>
                <Header sub color='teal' content='All Photos'/>

                <Card.Group itemsPerRow={5}>
                    <Card>
                          <Image src={profile.photoURL || '/assets/user.png'} />
                        <Button positive>Main Photo</Button>
                        </Card>
                    {photos && filteredPhotos.map(photo=>(
                       <Card key={photo.id}>
                       <Image src={photo.url} />
                       <div className='ui two buttons'>
                           <Button basic color='green' loading={loading} onClick={this.handleSetMainPhoto(photo)}>Main</Button>
                           <Button basic icon='trash' color='red' disabled={loading} onClick={this.handlePhotoDelete(photo)} />
                       </div>
                   </Card>))}
                </Card.Group>
            </Segment>
        );
    }
}

const mapDispatchToProp={
    uploadProfileImage,
    deletePhoto,
    setMainPhoto
}
const mapStateToProp=(state)=>{
    return{
        auth:state.firebase.auth,
        profile:state.firebase.profile,
        photos:state.firestore.ordered.photos,
        loading:state.async.loading
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
// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { firestoreConnect } from 'react-redux-firebase';
// import { compose } from 'redux';
// import {
//   Image,
//   Segment,
//   Header,
//   Divider,
//   Grid,
//   Button,
//   Card,
//   Icon
// } from 'semantic-ui-react';
// import { toastr } from 'react-redux-toastr';
// import Dropzone from 'react-dropzone';
// import Cropper from 'react-cropper';
// import 'cropperjs/dist/cropper.css';
// import { uploadProfileImage, deletePhoto, setMainPhoto } from '../userActions';

// const query = ({ auth }) => {
//   return [
//     {
//       collection: 'users',
//       doc: auth.uid,
//       subcollections: [{ collection: 'photos' }],
//       storeAs: 'photos'
//     }
//   ];
// };

// const actions = {
//   uploadProfileImage,
//   deletePhoto,
//   setMainPhoto
// };

// const mapState = state => ({
//   auth: state.firebase.auth,
//   profile: state.firebase.profile,
//   photos: state.firestore.ordered.photos,
//   loading: state.async.loading
// });

// class PhotosPage extends Component {
//   state = {
//     files: [],
//     fileName: '',
//     cropResult: null,
//     image: {}
//   };

//   cancelCrop = () => {
//     this.setState({
//       files: [],
//       image: {}
//     });
//   };

//   uploadImage = async () => {
//     try {
//       await this.props.uploadProfileImage(
//         this.state.image,
//         this.state.fileName
//       );
//       this.cancelCrop();
//       toastr.success('Success', 'Photo has been uploaded');
//     } catch (error) {
//       toastr.error('Oops', error.message);
//     }
//   };

//   handlePhotoDelete = (photo) => async () => {
//     try {
//       this.props.deletePhoto(photo);
//     } catch (error) {
//       toastr.error('Oops', error.message)
//     }
//   }

//   handleSetMainPhoto = (photo) => async () => {
//     try {
//       await this.props.setMainPhoto(photo)
//     } catch (error) {
//       toastr.error('Oops', error.message)
//     }
//   }

//   cropImage = () => {
//     if (typeof this.refs.cropper.getCroppedCanvas() === 'undefined') {
//       return;
//     }

//     this.refs.cropper.getCroppedCanvas().toBlob(blob => {
//       let imageUrl = URL.createObjectURL(blob);
//       this.setState({
//         cropResult: imageUrl,
//         image: blob
//       });
//     }, 'image/jpeg');
//   };

//   onDrop = files => {
//     this.setState({
//       files,
//       fileName: files[0].name
//     });
//   };

//   render() {
//     const { photos, profile, loading } = this.props;
//     let filteredPhotos;
//     if (photos) {
//       filteredPhotos = photos.filter(photo => {
//         return photo.url !== profile.photoURL
//       })
//     }
//     return (
//       <Segment>
//         <Header dividing size="large" content="Your Photos" />
//         <Grid>
//           <Grid.Row />
//           <Grid.Column width={4}>
//             <Header color="teal" sub content="Step 1 - Add Photo" />
//             <Dropzone onDrop={this.onDrop} multiple={false}>
//               <div style={{ paddingTop: '30px', textAlign: 'center' }}>
//                 <Icon name="upload" size="huge" />
//                 <Header content="Drop image here or click to upload" />
//               </div>
//             </Dropzone>
//           </Grid.Column>
//           <Grid.Column width={1} />
//           <Grid.Column width={4}>
//             <Header sub color="teal" content="Step 2 - Resize image" />
//             {this.state.files[0] && (
//               <Cropper
//                 style={{ height: 200, width: '100%' }}
//                 ref="cropper"
//                 src={this.state.files[0].preview}
//                 aspectRatio={1}
//                 viewMode={0}
//                 dragMode="move"
//                 guides={false}
//                 scalable={true}
//                 cropBoxMovable={true}
//                 cropBoxResizable={true}
//                 crop={this.cropImage}
//               />
//             )}
//           </Grid.Column>
//           <Grid.Column width={1} />
//           <Grid.Column width={4}>
//             <Header sub color="teal" content="Step 3 - Preview and Upload" />
//             {this.state.files[0] && (
//               <div>
//                 <Image
//                   style={{ minHeight: '200px', minWidth: '200px' }}
//                   src={this.state.cropResult}
//                 />
//                 <Button.Group>
//                   <Button
//                     loading={loading}
//                     onClick={this.uploadImage}
//                     style={{ width: '100px' }}
//                     positive
//                     icon="check"
//                   />
//                   <Button
//                     disabled={loading}
//                     onClick={this.cancelCrop}
//                     style={{ width: '100px' }}
//                     icon="close"
//                   />
//                 </Button.Group>
//               </div>
//             )}
//           </Grid.Column>
//         </Grid>

//         <Divider />
//         <Header sub color="teal" content="All Photos" />

//         <Card.Group itemsPerRow={5}>
//           <Card>
//             <Image src={profile.photoURL || '/assets/user.png'} />
//             <Button positive>Main Photo</Button>
//           </Card>
//           {photos &&
//             filteredPhotos.map(photo => (
//               <Card key={photo.id}>
//                 <Image src={photo.url} />
//                 <div className="ui two buttons">
//                   <Button loading={loading} onClick={this.handleSetMainPhoto(photo)} basic color="green">
//                     Main
//                   </Button>
//                   <Button onClick={this.handlePhotoDelete(photo)} basic icon="trash" color="red" />
//                 </div>
//               </Card>
//             ))}
//         </Card.Group>
//       </Segment>
//     );
//   }
// }

// export default compose(
//   connect(mapState, actions),
//   firestoreConnect(auth => query(auth))
// )(PhotosPage);