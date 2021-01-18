import React, {useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Form, Row, Col, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './Login.css';
import GoogleSignIn from './GoogleLogin'


const Register = props=>{
    const [user,setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password1: "",
        password2: "",
        role : ""});


    const onChange = e =>{
        setUser({...user,[e.target.name] : e.target.value});
    }

    const resetForm = ()=>{
        setUser({
        firstName: "",
        lastName: "",
        email: "",
        password1: "",
        password2: "",
        role: ""
    });
    }

    const onSubmit = e =>{
        e.preventDefault();
        if (user.firstName && user.lastName && user.email && user.password1 && user.role) {
            if (user.password1 === user.password2) {
                axios
                .post(`/user/register`, {
                  firstName: user.firstName,
                  lastName: user.lastName,
                  email: user.email,
                  password: user.password1,
                  role: user.role,
                })
                .then(res => {
                  resetForm();
                  toast.success(res.data.message);
                })
                .catch(err => {
                  resetForm();
                  toast.error(err.response.data.error);
                });
            } else {
              toast.error("Passwords don't matches");
            }
          } else {
            toast.error('Please fill all fields');
          }
    }

    
    return(
        
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', margin:"60px auto", width: '70%', minHeight: "80vh"}} className="shadow p-3 mb-5 bg-white rounded register-container">
            <ToastContainer />
            <Form style= {{width: '50%', margin: 'auto', minHeight: "50vh"}} onSubmit={onSubmit} className="register-form">
            <Row className="justify-content-md-center">
                <h2 style={{fontFamily: "Ubuntu", fontSize:'24px', fontWeight:"bold", margin:"20px 0", textAlign:"center", width: "100%", color:"#000051"}}>SIGN UP</h2>
            </Row>
            <Form.Group as={Row} >
                <Col sm={4} className="m-auto">
                    <Form.Check
                    type="radio"
                    label="I'm a parent"
                    name="role"
                    id="user"
                    value='user' onChange={onChange} 
                    />
                    <Form.Check
                    type="radio"
                    label="I'm a school manager"
                    name="role"
                    id="school"
                    value='school' onChange={onChange}
                    />
                </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="firstName">
                    <Form.Label column sm="2">
                    First Name
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control type="text" placeholder="First Name" name="firstName"value={user.firstName} onChange={onChange}  />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="lastName">
                    <Form.Label column sm="2">
                    Last Name
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control type="text" placeholder="Last Name" name="lastName" value={user.lastName} onChange={onChange}  />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="email">
                    <Form.Label column sm="2">
                    Email
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control type="email" placeholder="Email" name="email" value={user.email} onChange={onChange} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="password1">
                    <Form.Label column sm="2">
                    Password
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control type="password" placeholder="Password" name="password1" value={user.password1} onChange={onChange}/>
                    </Col>
                    <Col sm="2"></Col>
                    <Col sm="10" style={{color:"#000051"}} className="password-rule">
                    Password must contain at least 6 characters
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="password2">
                    <Form.Label column sm="2">
                    Confirm Password
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control type="password" placeholder="Confirm Password" name="password2" value={user.password2} onChange={onChange}/>
                    </Col>
                </Form.Group>
                <Row className="d-flex justify-content-end link">
                <Link to="login" style={{color: '#000051', fontSize:"1.2rem"}}>Have an account?</Link>
                </Row>
                <Form.Group as={Row} className="mt-5" className="d-flex justify-content-center">
                <Row className="d-flex justify-content-center" style={{width:"300px"}}>
                <Button style={{background: '#000051', border: "3px solid #000051", margin: "10px", borderRadius:"10px", fontSize: "1.1rem", width:"250px",fontWeight:"bold"}} className="hovered-blue"type="submit" size="lg">
                    Create an account
                </Button>{' '}
                </Row>
                </Form.Group>
                <Form.Group as={Row} className="mt-5" className="d-flex justify-content-center">
                <GoogleSignIn/>
                </Form.Group>
                </Form>
        </div>
    )
}

export default Register;