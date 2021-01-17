import React, {useState,useContext} from 'react';
import {AuthContext} from '../../Context/AuthContext';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  Col, Button } from 'react-bootstrap';
import { useHistory } from "react-router";



const GoogleSignIn = props=>{
    const authContext = useContext(AuthContext);
    const history = useHistory();
    const sendGoogleToken = tokenId => {
        axios
          .post(`user/googlelogin`, {
            idToken: tokenId
          })
          .then(res => {
            const { isAuthenticated,user} = res.data;
            authContext.setUser(user);
            authContext.setIsAuthenticated(isAuthenticated);
            history.push('/searchschool')
          })
          .catch(error => {
              console.log(error.response);
            toast.error('GOOGLE SIGN IN ERROR', error.response)
          });
      };
    
    //   Get response from google
    const responseGoogle = response => {
        sendGoogleToken(response.tokenId);
      };

    
    return(
                <GoogleLogin
                  clientId={`${process.env.REACT_APP_GOOGLE_CLIENT}`}
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                  render={renderProps => (
                    <Col sm="12" className="d-flex justify-content-center">
                    <Button style={{background: '#ffff', color:"#000051", border: "3px solid #000051", borderRadius:"10px", fontSize: "1.1rem", margin:"10px", width:"250px", fontWeight:"bold"}} className='hovered-google' type="submit" size="lg" onClick={renderProps.onClick}
                      disabled={renderProps.disabled}><i className='fab fa-google ' /><span style={{marginLeft:"10px"}}>Sign In with Google</span>
                    </Button>{' '}
                    </Col>
                  )}>
                    
                  </GoogleLogin>
    )
}

export default GoogleSignIn;
