import React from 'react';
import '../App.css';
import { Button } from './Button';
import './LandingSec.css';
import Background from './assets/cover.jpg'
import { Link } from 'react-router-dom';

function LandingSec() {
    return ( 
        <div className = 'sec-container' >
        <p> Finding the right school for your child just got easier <br/> 
            iSchool helps you find the best school for your child by offering the most proper schools according to your preferences and your address.
        </p> 
        <div className = 'sec-btns' >
            <Button className = 'btns'
                    buttonStyle = 'btn--outline'
                    buttonSize = 'btn--large' >
               Search For School  
            </Button>
        </div> 

        <div>
             <p className="text"> By signing-up you can save your favorite schools in your account, as well as give ratings to schools and comment about them.  <br/>
             If You Are School Manager And You Want To Register Your School, Please <Link to='/register' style={{color: '#B71C1C', fontWeight: 'bold', textDecoration: "none"}}>SIGN UP</Link>! </p> 
       </div>
        <div className="student">
            <img src={Background} alt="student"/>
        </div>
        
        </div>
    );
}

export default LandingSec
