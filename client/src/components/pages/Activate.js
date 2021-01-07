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
            {/* <Row className="d-flex flex-column justify-content-center">
            <Form.Group as={Row} controlId="email">
                    <Form.Label column sm="2">
                    Email
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control type="email" placeholder="Email" name="email"  />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="password">
                    <Form.Label column sm="2">
                    Password
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control type="password" placeholder="Password" name="password" />
                    </Col>
                </Form.Group>
            </Row> */}
                
                <Form.Group as={Row} className="d-flex justify-content-center">
                {/* <Col sm="4" className="d-flex justify-content-center">
                <Link to="/login">
                <Button href="/login" style={{background: '#000051', border: "none", borderRadius:"10px", fontSize: "1.1rem", padding: "8px 35px", margin:"10px"}} size="lg"> New user?
                </Button>
                </Link>
                </Col> */}
                <Col sm="4" className="d-flex justify-content-center">
                {/* <Link to="/login"> */}
                <Button style={{background: '#B71C1C', border: "none", borderRadius:"10px", fontSize: "1.1rem", padding: "8px 35px", margin:"10px"}} type="submit" size="lg">
                Activate your Account
                </Button>
                {/* </Link> */}
                </Col>
                </Form.Group>
                </Form>
        </div>
// {/* <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
//       {/* {isAuth() ? <Redirect to='/' /> : null} */}
//       <ToastContainer />
//       <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
//         <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
//           <div className='mt-12 flex flex-col items-center'>
//             <h1 className='text-2xl xl:text-3xl font-extrabold'>
//               Welcome {firstName} {lastName}
//             </h1>
//             <p>Your email has been verified, please Sign In</p>

//             <form
//               className='w-full flex-1 mt-8 text-indigo-500'
//               onSubmit={onSubmit}
//             >
//               <div className='mx-auto max-w-xs relative '>
//                 <button
//                   type='submit'
//                   className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
//                 >
//                   <i className='fas fa-user-plus fa 1x w-6  -ml-2' />
//                   <span className='ml-3'>Activate your Account</span>
//                 </button>
//               </div>
//               <div className='my-12 border-b text-center'>
//                 <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
//                   Or sign up again
//                 </div>
//               </div>
//               <div className='flex flex-col items-center'>
//                 <a
//                   className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3
//            bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
//                   href='/register'
//                   target='_self'
//                 >
//                   <i className='fas fa-sign-in-alt fa 1x w-6  -ml-2 text-indigo-500' />
//                   <span className='ml-4'>Sign Up</span>
//                 </a>
//               </div>
//             </form>
//           </div>
//         </div>
//         <div className='flex-1 bg-indigo-100 text-center hidden lg:flex'>
          
//         </div>
//       </div>
    // </div> 
  );
}

export default Activate;