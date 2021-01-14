import React from 'react'
import {Form} from 'react-bootstrap'
import './Label.css'
const Label = ({label}) => {
    return (
    <Form.Label bsPrefix='i-label'>{label}</Form.Label>
    )
}

export default Label
