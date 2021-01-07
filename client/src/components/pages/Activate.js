import React, {useState,useContext, useRef,useEffect} from 'react';
import AuthService from '../../Services/AuthService';
import {AuthContext} from '../../Context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { Form, Row, Col, Button , Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const Activate = props=>{
    const [formData, setFormData] = useState({
        token: '', firstName: "", lastName:""
      });
    
      let timerID = useRef(null);
      useEffect(() => {
        let token = props.match.params.token;
        let {firstName, lastName} = jwt.decode(token);
    
        if (token) {
          setFormData({ ...formData, firstName, lastName, token });
        }

        clearTimeout(timerID)
    
      }, [props.match.params]);
      const { firstName, lastName,token} = formData;
  
  
    const onSubmit = e =>{
        e.preventDefault();
        axios
      .post('/user/activation', {
        token: token
      })
      .then(res => {
          console.log(res.data)
        setFormData({
            ...formData
          });
        toast.success(res.data.message);
        timerID =setTimeout(()=>{
                props.history.push('/login');
        },3000)
        
      })
      .catch(err => {
        toast.error(err.response.data.errors);
      });
    }



    return(
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', margin:"50px auto", width: '60%', minHeight: "60vh"}} className="shadow p-3 mb-5 bg-white rounded">
             <ToastContainer />
             <Form style= {{width: '50%', height: "30vh", margin: 'auto'}} className = "d-flex flex-column justify-content-around" onSubmit={onSubmit}>
            <Row className="justify-content-md-center">
                <h2 style={{fontFamily: "Ubuntu", fontSize:'24px', fontWeight:"bold", paddingTop:"30px"}}>Welcome {firstName} {lastName}</h2>
            </Row>
                <Form.Group as={Row} className="d-flex justify-content-center">
                <Col sm="4" className="d-flex justify-content-center">
                <Button style={{background: '#B71C1C', border: "none", borderRadius:"10px", fontSize: "1.1rem", padding: "8px 35px", margin:"10px"}} type="submit" size="lg">
                Activate your Account
                </Button>
                </Col>
                </Form.Group>
                </Form>
        </div>
  );
}

export default Activate;