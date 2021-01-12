import React, {useState, useRef,useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Form, Row, Col, Button} from 'react-bootstrap';
import "./Login.css"


const ResetPassword= props=>{
    const [formData, setFormData] = useState({
        password1: "",
        password2: "",
        token:""
      });
    
      let timerID = useRef(null);
      const { password1, password2, token } = formData;

      useEffect(() => {
        let token = props.match.params.token;
      
        if (token) {
          setFormData({ ...formData, token });
        }

        clearTimeout(timerID)
    
      }, [props.match.params]);


      const onChange = e =>{
        setFormData({...formData,[e.target.name] : e.target.value});
      }
  
  
    const onSubmit = e =>{
        e.preventDefault();
        if ((password1 === password2) && password1 && password2) {
          axios
          .put('/user/resetpassword', {
            newPassword: password1,
            token: token,
          })
          .then(res => {
            setFormData({
                ...formData
              });
            toast.success(res.data.message);
            timerID =setTimeout(()=>{
                    props.history.push('/login');
            },3000)
            
          })
          .catch(err => {
            err.response.data.error ? toast.error(err.response.data.error) : 
            toast.error(err.response.data.errors);
          });

        }else{
          toast.error('Passwords don\'t matches');
        }

    }

    return(
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', margin:"100px auto", width: '60%', minHeight: "75vh"}} className="shadow p-3 mb-5 bg-white rounded main-container">
             <ToastContainer />
             <Form style= {{width: '50%', height: "30vh", margin: 'auto'}} className = "d-flex flex-column justify-content-around" onSubmit={onSubmit}>
            <Row className="justify-content-md-center">
                <h2 style={{fontFamily: "Ubuntu", fontSize:'24px', fontWeight:"bold", padding:"30px", textAlign:"center", width: "100%"}}>Reset Your Password</h2>
            </Row>
            <Form.Group as={Row} controlId="password1">
                    <Col sm="12">
                    <Form.Control type="password" placeholder="Password" name="password1" value={password1} onChange={onChange}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="password2">
                    <Col sm="12">
                    <Form.Control type="password" placeholder="Confirm Your Password" name="password2" value={password2} onChange={onChange}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="d-flex justify-content-center">
                <Col sm="12" className="d-flex justify-content-center">
                <Button style={{background: '#B71C1C', border: "none", borderRadius:"10px", fontSize: "1.1rem", padding: "8px 35px", margin:"10px", width: "180px", fontWeight:"bold"}} className='hovered-red' type="submit" size="lg">
                Submit
                </Button>
                </Col>
                </Form.Group>
                </Form>
        </div>
  );
}

export default ResetPassword;