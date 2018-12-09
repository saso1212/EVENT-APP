import React from 'react';
import {Form,Label} from 'semantic-ui-react';
// !!error znaci ke dade true ili false
const TextInput = ({input, placeholder, width, type, meta:{touched,error}}) => {
    return (
        <Form.Field error={touched && !!error} width={width}>
            <input  {...input} placeholder={placeholder} type={type} />
            {touched && error && <Label basic color='red'>{error}</Label>}
        </Form.Field>
    );
};

export default TextInput;