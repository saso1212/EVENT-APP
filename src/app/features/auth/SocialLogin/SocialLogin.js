import React from 'react'
import {Button,Icon} from 'semantic-ui-react'
import {socialLogin} from '../authActions'
import {connect} from 'react-redux'



const SocialLogin = ({socialLogin}) => {
  return (
       <div>
         <Button type="button" onClick={()=>socialLogin('facebook')} style={{ marginBottom: '10px' }} fluid color="facebook">
           <Icon name="facebook" /> Login with Facebook
         </Button>
   
         <Button type="button" onClick={()=>socialLogin('google')} fluid color="google plus">
           <Icon name="google plus" />
           Login with Google
         </Button>
       </div>
  )
}
const mapDispatchToProps={
  socialLogin
}
export default connect(null,mapDispatchToProps)(SocialLogin)
