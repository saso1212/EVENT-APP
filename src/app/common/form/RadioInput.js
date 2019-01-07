import React from 'react'
import {Form} from 'semantic-ui-react'

const RadioInput = ({input,width,type,label}) => {
  return (
    <Form.Field  >
        <div className="ui radio"> 
          <input type={type} {...input} /> {' '}
          <label>{label}</label>
        </div>
    </Form.Field>
  )
}

export default RadioInput
