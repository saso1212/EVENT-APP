import React from 'react';
import { Form, Segment, Button,Label,Divider } from 'semantic-ui-react';
import { Field,reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import TextInput from '../../../common/form/TextInput';
import {login,socialLogin} from '../authActions';
import SocialLogin from '../SocialLogin/SocialLogin'
//because we are using reduxForm we alredy have handleSubmit props bu default 
const LoginForm = ({login,handleSubmit,error,socialLogin}) => {
  return (
    <Form  size="large" onSubmit={handleSubmit(login)}>
      <Segment>
        <Field
          name="email"
          component={TextInput}
          type="text"
          placeholder="Email Address"
        />
        <Field
          name="password"
          component={TextInput}
          type="password"
          placeholder="password"
        />
        {error && <Label basic color='red'>{error}</Label>}
        <Button fluid size="large" color="teal">
          Login
        </Button>
        <Divider horizontal>
          OR
        </Divider>
        <SocialLogin socialLogin={socialLogin}/>
      </Segment>
    </Form>
  );
};

 const mapDispatchToProps={
        login,
        socialLogin
       }

export default connect(null,mapDispatchToProps)(reduxForm({form:'loginForm'})(LoginForm));