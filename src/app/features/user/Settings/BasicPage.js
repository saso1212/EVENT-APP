import React, {Component} from 'react';
import {Segment, Form, Header, Divider, Button} from 'semantic-ui-react';
import {Field, reduxForm} from 'redux-form';
import moment from 'moment'
import DateInput from "../../../common/form/DateInput";
import PlaceInput from "../../../common/form/PlaceInput";
import TextInput from "../../../common/form/TextInput";
import RadioInput from "../../../common/form/RadioInput";

class BasicsPage extends Component {

    render() {
        const {pristine, submitting,updateProfile,handleSubmit} = this.props;
        return (
            <Segment>
                <Header dividing size='large' content='Basics' />
                <Form onSubmit={handleSubmit(updateProfile)}>
                    <Field
                        width={8}
                        name='displayName'
                        type='text'
                        component={TextInput}
                        placeholder='Known As'
                    />
                    <Form.Group inline>
                    <label>Gender: </label>
                      <Field
                         name='gender'
                         type='radio'
                         value="male"
                         label='Male'
                        component={RadioInput}
                      />
                       <Field
                         name='gender'
                         type='radio'
                         value="female"
                         label='Female'
                        component={RadioInput}
                      />
                    </Form.Group>
                    <Field
                        width={8}
                        name='dateOfBirth'
                        component={DateInput}
                        dateFormat='YYYY-MM-DD'
                        showYearDropdown={true}
                        showMonthDropdown={true}
                        dropdownMode='select'
                        maxDate={moment().subtract(14,"years")}
                        placeholder='Date of Birth'
                    />
                    <Field
                        name='city'
                        placeholder='Home Town'
                        options={{types: ['(cities)']}}
                        label='Female'
                        component={PlaceInput}
                        width={8}
                    />
                    <Divider/>
                    <Button disabled={pristine || submitting} size='large' positive content='Update Profile'/>
                </Form>
            </Segment>
        );
    }
}
//enableReiniciazle is form to be filedd even if we refresh the page
export default reduxForm({form: 'userProfile',enableReinitialize:true,destroyOnUnmount:false})(BasicsPage);