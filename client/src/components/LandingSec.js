import React from 'react';
import '../App.css';
import { Button } from './Button';
import './LandingSec.css';
import Background from './assets/cover.jpg'
import { Link } from 'react-router-dom';

function LandingSec() {
    return ( 
        <div className = 'sec-container' >
        <h3 > Find The Best School For Your Child </h3> 
        <div className = 'sec-btns' >
            <Button className = 'btns'
                    buttonStyle = 'btn--outline'
                    buttonSize = 'btn--large' >
               Search For School  
            </Button>
        </div> 
        <div>
             <h3 className="text"> If You Are School Manager And You Want To Register Your School, Please <Link to='/register' style={{color: '#B71C1C', fontWeight: 'bold', textDecoration: "none"}}>SIGN UP</Link>! </h3> 
        </div> 
        <div className="student">
            <img src={Background} alt="student"/>
        </div>
        
        </div>
    );
}

export default LandingSec
