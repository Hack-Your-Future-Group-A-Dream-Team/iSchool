import React, {useState, useRef,useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { Form, Row, Col, Button } from 'react-bootstrap';
import "./Login.css"


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
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', margin:"50px auto", width: '70%', minHeight: "77vh"}} className="shadow p-3 mb-5 bg-white rounded main-container">
             <ToastContainer />
             <Form style= {{width: '70%', height: "30vh", margin: 'auto'}} className = "d-flex flex-column justify-content-around" onSubmit={onSubmit}>
            <Row className="justify-content-md-center">
                <h2 style={{fontFamily: "Ubuntu", fontSize:'24px', fontWeight:"bold", paddingTop:"30px", textAlign:"center", width:"100%"}}>Welcome {firstName} {lastName}</h2>
            </Row>
                <Form.Group as={Row} className="d-flex justify-content-center">
                <Col sm="12" className="d-flex justify-content-center">
                <Button style={{background: '#B71C1C', border: "3px solid #B71C1C", borderRadius:"10px", fontSize: "1.1rem", padding: "8px 20px", margin:"10px", width: "220px", fontWeight:"bold"}} className='hovered-red' type="submit" size="lg">
                Activate your Account
                </Button>
                </Col>
                </Form.Group>
                </Form>
        </div>
  );
}

export default Activate;