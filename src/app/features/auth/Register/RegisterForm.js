import React from 'react';
import {connect} from 'react-redux'
import { Form, Segment, Button } from 'semantic-ui-react';
import { Field,reduxForm} from 'redux-form';
import TextInput from '../../../common/form/TextInput';
import {registerUser} from '../authActions'
//handleSubmit are methods that provide reduxForm
const RegisterForm = ({handleSubmit,registerUser}) => {
  return (
    <div>
      <Form size="large" onSubmit={handleSubmit(registerUser)}>
        <Segment>
          <Field
            name="displayName"
            type="text"
            component={TextInput}
            placeholder="Known As"
          />
          <Field
            name="email"
            type="text"
            component={TextInput}
            placeholder="Email"
          />
          <Field
            name="password"
            type="password"
            component={TextInput}
            placeholder="Password"
          />
          <Button fluid size="large" color="teal">
            Register
          </Button>
        </Segment>
      </Form>
    </div>
  );
};

const mapDispatchToProp={
  registerUser
}

export default connect(null,mapDispatchToProp)(reduxForm({form:'registerForm'})(RegisterForm));