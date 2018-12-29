import React from 'react';
import { Form, Segment, Button,Label } from 'semantic-ui-react';
import { Field,reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import TextInput from '../../../common/form/TextInput';
import {login} from '../authActions';
//because we are using reduxForm we alredy have handleSubmit props bu default 
const LoginForm = ({login,handleSubmit,error}) => {
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
      </Segment>
    </Form>
  );
};

 const mapDispatchToProps={
        login
       }

export default connect(null,mapDispatchToProps)(reduxForm({form:'loginForm'})(LoginForm));