import React from 'react';
import {connect} from 'react-redux'
import { Form, Segment, Button,Label,Divider } from 'semantic-ui-react';
import { Field,reduxForm} from 'redux-form';
import {combineValidators,isRequired,composeValidators,hasLengthGreaterThan} from 'revalidate'
import TextInput from '../../../common/form/TextInput';
import {registerUser} from '../authActions'
import SocialLogin from '../SocialLogin/SocialLogin'
//handleSubmit are methods that provide reduxForm
const RegisterForm = ({handleSubmit,registerUser,error,invalid,pristine,submitting}) => {
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
           {error && <Label basic color='red'>{error}</Label>}
          <Button fluid size="large" color="teal" disabled={invalid || pristine || submitting}>
            Register
          </Button>
          <Divider horizontal>
          OR
        </Divider>
        <SocialLogin/>
        </Segment>
      </Form>
    </div>
  );
};

const validate = combineValidators({
  displayName:isRequired('displayName'),
  password: composeValidators(
    isRequired({message: 'Please enter a description'}),
    hasLengthGreaterThan(6)({message: 'Description needs to be at least 6 characters'})
  )(),
  email: isRequired('email'),
  //will put default validation message
});

const mapDispatchToProp={
  registerUser
}

// lpochuwspt_1546264560@tfbnw.net

export default connect(null,mapDispatchToProp)(reduxForm({form:'registerForm',enableReinitialize:true,validate})(RegisterForm));