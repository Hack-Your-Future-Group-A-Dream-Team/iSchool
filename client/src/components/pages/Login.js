import React, {useState,useContext} from 'react';
import AuthService from '../../Services/AuthService';
import {AuthContext} from '../../Context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form, Row, Col, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import './Login.css' 

const Login = props=>{
    const [user,setUser] = useState({email: "", password : ""});
    const authContext = useContext(AuthContext);

    const onChange = e =>{
        setUser({...user,[e.target.name] : e.target.value});
    }
    const sendGoogleToken = tokenId => {
    axios
      .post(`user/googlelogin`, {
        idToken: tokenId
      })
      .then(res => {
        console.log(res.data);
        const { isAuthenticated,user} = res.data;
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        user.role === 'admin'
        ? props.history.push('/admin')
        : props.history.push('/myschools');
      })
      .catch(error => {
          console.log(error.response);
        toast.error('GOOGLE SIGN IN ERROR', error.response)
      });
  };

//   Get response from google
const responseGoogle = response => {
    console.log(response);
    sendGoogleToken(response.tokenId);
  };

    const onSubmit = e =>{
        e.preventDefault();
        AuthService.login(user).then(data=>{
            const { isAuthenticated,user} = data;
            if(isAuthenticated){
                console.log(user);
                toast.success("Logged in Successfully");
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
                props.history.push('/myschools');
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
             <Form style= {{width: '50%', height: "45vh", margin: 'auto'}} className = "d-flex flex-column justify-content-around main-form" onSubmit={onSubmit}>
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
               
                <Row className="d-flex justify-content-end link">
                <Link to="user/password/forgot" style={{color: '#000051', fontSize:"1.1rem", textDecoration:'none'}}>Forgot Your Password?</Link>
                </Row>
                <Form.Group as={Row} className="d-flex justify-content-center">
                <Col sm="5" className="d-flex justify-content-center">
                <Link to="/register" style={{textDecoration:"none"}} className="hovered-blue"> 
                <Button style={{background: '#000051', border: "3px solid #000051", borderRadius:"10px", fontSize: "1.1rem" , margin:"10px", width: "180px", fontWeight:"bold"}} className='hovered-blue' size="lg">New user?
                </Button>
                </Link>
                </Col>
                <Col sm="5" className="d-flex justify-content-center" style={{width:"300px"}}>
                <Button style={{background: '#B71C1C', border: "3px solid #B71C1C", borderRadius:"10px", fontSize: "1.1rem", margin:"10px", width:"180px", boxSizing:"border-box", fontWeight:"bold"}} className='hovered-red' type="submit" size="lg">
                    Sign In
                </Button>{' '}
                </Col>
                </Form.Group>
                <Form.Group>
                <GoogleLogin
                  clientId={`${process.env.REACT_APP_GOOGLE_CLIENT}`}
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                  render={renderProps => (
                    <Col sm="12" className="d-flex justify-content-center">
                    <Button style={{background: '#4285f4', border: "3px solid #4285f4", borderRadius:"10px", fontSize: "1.1rem", margin:"10px", width:"250px", fontWeight:"bold"}} className='hovered-google' type="submit" size="lg" onClick={renderProps.onClick}
                      disabled={renderProps.disabled}><i className='fab fa-google ' /><span style={{marginLeft:"10px"}}>Sign In with Google</span>
                    </Button>{' '}
                    </Col>
                  )}>
                    
                  </GoogleLogin>
                </Form.Group>
                </Form>
        </div>
    )
}

export default Login;