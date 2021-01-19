import React from 'react';
import '../App.css';
import { Button } from './Button';
import './LandingSec.css';
import Background from './assets/cover.jpg'
import { Link } from 'react-router-dom';

function LandingSec() {
    return ( 
        <div className = 'sec-container' >
        <p> Finding the right school for your child just got easier! <br/> 
            iSchool helps you find the best school for your child by a few clicks.
        </p> 
        <div className = 'sec-btns' >
            <Button className = 'btns'
                    buttonStyle = 'btn--outline'
                    buttonSize = 'btn--large' >
               Search For School  
            </Button>
        </div> 

        <div className='signup'>
             <p className="text"> By <Link to='/register' style={{color: '#B71C1C', fontWeight: 'bold', textDecoration: "none"}}>signing up</Link> you can save your favorite schools in your account, as well as give ratings to schools and comment about them.  <br/>
             If you are a school manager and you want to register your school, please <Link to='/register' style={{color: '#B71C1C', fontWeight: 'bold', textDecoration: "none"}}>SIGN UP</Link>! </p> 
       </div>
        <div className="student">
            <img src={Background} alt="student"/>
        </div>
        
        </div>
    );
}

export default LandingSec
