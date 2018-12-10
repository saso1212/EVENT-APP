import React from 'react'
import { Form, Label } from 'semantic-ui-react'

const TextArea = ({input, rows, width, type, placeholder, meta: {touched, error}}) => {
    console.log(input);
  return (
    <Form.Field error={touched && !!error} width={width}>
      <textarea {...input} placeholder={placeholder} rows={rows}></textarea>
      {/* error validation under   */}
      {touched && error && <Label basic color='red'>{error}</Label>}
    </Form.Field>
  )
}

export default TextArea
