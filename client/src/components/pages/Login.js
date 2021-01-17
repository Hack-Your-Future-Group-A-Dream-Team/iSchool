import React, {useState,useContext} from 'react';
import AuthService from '../../Services/AuthService';
import {AuthContext} from '../../Context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form, Row, Col, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './Login.css' 
import GoogleSignIn from './GoogleLogin'

const Login = props=>{
    const [user,setUser] = useState({email: "", password : ""});
    const authContext = useContext(AuthContext);

    const onChange = e =>{
        setUser({...user,[e.target.name] : e.target.value});
    }

    const onSubmit = e =>{
        e.preventDefault();
        AuthService.login(user).then(data=>{
            const { isAuthenticated,user} = data;
            if(isAuthenticated){
                console.log(user);
                toast.success("Logged in Successfully");
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
                props.history.push('/searchschool');
            }else{
                toast.error(data.error);
            }
            
        }).catch(err=>{
            console.log(err);
        });
    }


    return(
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', margin:"60px auto", width: '70%', minHeight: "80vh"}} className="shadow p-3 mb-5 bg-white rounded main-container">
             <ToastContainer />
             <Form style= {{width: '50%', margin: 'auto', minHeight: "45vh"}} className = "d-flex flex-column justify-content-around main-form" onSubmit={onSubmit}>
            <Row className="justify-content-md-center">
                <h2 style={{fontFamily: "Ubuntu", fontSize:'24px', fontWeight:"bold", paddingTop:"30px", textAlign:"center", width:"100%", color:"#000051"}}>SIGN IN</h2>
            </Row>
            <Form.Group as={Row} controlId="email">
                    <Form.Label column sm="2">
                    Email
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control type="email" placeholder="Email" name="email" value={user.email} onChange={onChange} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="password">
                    <Form.Label column sm="2">
                    Password
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control type="password" placeholder="Password" name="password" value={user.password1} onChange={onChange}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="password">
                    <Form.Label column sm="2">
                    </Form.Label>
                    <Col sm="10" className="d-flex justify-content-between link">
                    <Link to="/register" style={{color: '#000051', fontSize:"1.2rem"}} className="back-to-register">New user?</Link>
                  <Link to="user/password/forgot" style={{color: '#000051', fontSize:"1.2rem"}}>Forgot Your Password?</Link>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mt-5" className="d-flex justify-content-center">
                <Row className="d-flex justify-content-center" style={{width:"300px"}}>
                <Button style={{background: '#000051', border: "3px solid #000051", margin: "10px", borderRadius:"10px", fontSize: "1.1rem", width:"250px",fontWeight:"bold"}} className="hovered-blue"type="submit" size="lg">
                    Sign In
                </Button>{' '}
                </Row>
                </Form.Group>
                <Form.Group>
                  <GoogleSignIn/>
                </Form.Group>
                </Form>
        </div>
    )
}

export default Login;