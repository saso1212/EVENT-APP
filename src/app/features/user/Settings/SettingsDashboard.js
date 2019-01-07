import React from 'react';
import {Grid} from 'semantic-ui-react';
import {Switch,Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import {updatePassword} from '../../auth/authActions'
import {updateProfile} from '../userActions'
import SettingsNav from './SettingsNav';
import BasicPage from './BasicPage';
import PhotosPage from './PhotosPage';
import AccountPage from './AccountPage';
import AbouthPage from './AbouthPage';


const SettingsDashboard = ({updatePassword,providerId,user,updateProfile}) => {
    return (
        <Grid>
            <Grid.Column  width={12}>
            <Switch>
                <Redirect exact from='/settings' to='/settings/basic'/>
                <Route path='/settings/basic'
                // we need initialValues for our form, this is method that puts the initial values from 
                // user whrn the BasicPage componenet is loadeed
                 render={()=><BasicPage initialValues={user} updateProfile={updateProfile}/>} />
                <Route path='/settings/abouth' 
                render={()=><AbouthPage initialValues={user} updateProfile={updateProfile} />}/>
                <Route path='/settings/photos' component={PhotosPage}/>
                <Route path='/settings/account' 
                render={()=><AccountPage updatePassword={updatePassword} providerId={providerId}/>}/>
            </Switch>
            </Grid.Column>
            <Grid.Column  width={4}>
            <SettingsNav/>
            </Grid.Column>
        </Grid>
    );
};
const mapStateToProps=(state)=>{
    return{
        // because firt the component is lloaded and after the database is loaded we cahack
        //providerId:state.firebase.auth.isLoaded && state.firebase.auth.providerData[0].providerId
        //but there is another way bu seting up in index.js render to be done after autentication 
        // buy use rrfConfig( attachAuthIsReady:true)
        providerId: state.firebase.auth.providerData[0].providerId,
        user:state.firebase.profile
    }
    
}

const mapDispatchToProps={
    updatePassword,
    updateProfile
}
export default connect(mapStateToProps,mapDispatchToProps)(SettingsDashboard);