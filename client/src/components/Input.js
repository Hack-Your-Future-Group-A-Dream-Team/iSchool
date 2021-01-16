import React from 'react'
import {Form} from 'react-bootstrap'
import './Input.css'
const Input = ({type,placeholder,name,value,onChange}) => {
    return (
        <Form.Control type={type} placeholder={placeholder} name={name} value={value} onChange={onChange} className='i-input'/>
    )
}

export default Input
