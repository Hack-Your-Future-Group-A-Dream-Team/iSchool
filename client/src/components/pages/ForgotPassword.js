import React, {useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Form, Row, Col, Button} from 'react-bootstrap';
import './Login.css'


const ForgotPassword = props =>{
    const [formData, setFormData] = useState({
        email: ''
      });
      
      const {email} = formData;

      const onChange = e =>{
        setFormData({...formData,[e.target.name] : e.target.value});
      }

    const onSubmit = e =>{
      if (email) {
           e.preventDefault();
        axios
      .put('/user/forgotpassword', {
        email: email
      })
      .then(res => {
        setFormData({
            ...formData
          });
        toast.success(res.data.message);  
      })
      .catch(err => {
        toast.error(err.response.data.error);
      });
      }else{
        toast.error('Please provide your email');
      }
       
    }


    return(
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', margin:"60px auto", width: '70%', minHeight: "77vh"}} className="shadow p-3 mb-5 bg-white rounded main-container">
             <ToastContainer />
             <Form style= {{width: '50%', height: "30vh", margin: 'auto'}} className = "d-flex flex-column justify-content-around main-form" onSubmit={onSubmit}>
            <Row className="justify-content-md-center">
                <h2 style={{fontFamily: "Ubuntu", fontSize:'24px', fontWeight:"bold", padding:"30px", textAlign:"center"}}>Forgot Your Password</h2>
            </Row>
            <Form.Group as={Row} controlId="email">
                    <Form.Label column sm="2">
                    Email
                    </Form.Label>
                    <Col sm="8">
                    <Form.Control type="email" placeholder="Please provide your email" name="email" value={email} onChange={onChange} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="d-flex justify-content-center">
                <Col sm="12" className="d-flex justify-content-center">
                <Button style={{background: '#B71C1C', border: "3px solid #B71C1C", borderRadius:"10px", fontSize: "1.1rem", padding: "8px 35px", margin:"10px", width:"180px", fontWeight:"bold"}} className='hovered-red' type="submit" size="lg">
                Submit
                </Button>
                </Col>
                </Form.Group>
                </Form>
        </div>
  );
}

export default ForgotPassword;