import React from 'react'
import { Form, Label } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'

const DateInput = ({input: {value, onChange,onBlur, ...restInput}, width, placeholder, meta: {touched, error}, ...rest}) => {
  //...resetInput or whatever you like means that you can pass another propos even you dont declare
  if(value){
    value=moment(value,'X')
  }
  return (
    <Form.Field error={touched && !!error} width={width}>
      <DatePicker
        {...rest}
        placeholderText={placeholder}
        selected={value ? moment(value) : null}
        onChange={onChange}
        //we must use onBluse method because of the problem after seting the date it reset 
        //after the date change to 1970
        onBlur={()=>onBlur()}
        {...restInput}
      />
      {touched && error && <Label basic color='red'>{error}</Label>}
    </Form.Field>
  )
}

export default DateInput
