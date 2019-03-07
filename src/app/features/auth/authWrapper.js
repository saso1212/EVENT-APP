import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect'
import { openModal } from '../modals/modalActions'

const UserIsAuthenticated = connectedReduxRedirect({
    wrapperDisplayName: 'UserIsAuthenticated',
    allowRedirectBack: true,
    redirectPath: '/events',
    //we use this if the user is auth or not
    //{firebase: {auth}} is connected to our redux store
    authenticatedSelector: ({firebase: {auth}}) => 
        auth.isLoaded && !auth.isEmpty,
    redirectAction: newLoc => (dispatch) => {
        dispatch(openModal('UnauthModal'))
    }
})

export default UserIsAuthenticated