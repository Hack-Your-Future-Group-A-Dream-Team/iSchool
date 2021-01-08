const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const nodemailer = require('nodemailer');
const JWT = require('jsonwebtoken');
const User = require('../models/User');
const School = require('../models/School');
const { validRegister, validLogin, forgotPasswordValidator, resetPasswordValidator} = require('../helpers/valid')
const {errorHandler} = require('../helpers/dbErrorHandler');
const { validationResult} = require('express-validator');
const url = require('url'); 

const signToken = userID =>{
    return JWT.sign({
        iss : "iSchool",
        sub : userID
    },process.env.JWT_SECRET,{expiresIn : "7d"});
}



//-------------------REGISTER-----------------//
userRouter.post('/register',validRegister,(req,res)=>{
    const { email,firstName,lastName, address, password,role } = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const firstError = errors.array().map(error=> error.msg)[0]
        return res.status(422).json({
            error:firstError
        })
    }else{
        User.findOne({email},(err,user)=>{
            if(err)
                res.status(500).json({error: "Error has occurred"});
            if(user)
                res.status(400).json({error: "Email already exists"});
            else{
                const token = JWT.sign({ email,firstName,lastName, address, password,role}, process.env.JWT_SECRET, { expiresIn: '30m' });

                // Email data sending

            let smtpTransport = nodemailer.createTransport({
                service: 'gmail',
                auth:{
                    user: 'hyf.ischool@gmail.com',
                    pass: process.env.GMAIL_PASSWORD
                }

                
            })
            
            const CLIENT_URL = 'https://ischool-hyf-team.herokuapp.com';

            const output = `
                <h2 style="color: #000051">Hello ${firstName} ${lastName}</h2>
                <h1 style="color: #B71C1C">Please click <a href="${CLIENT_URL}/user/activate/${token}">here</a> to activate your account</h1>
                <h2 style="color:#000051" ><b style="color:#f9a825">NOTE: </b> The activation link expires in 30 minutes.</h2>
                `;

            

            let mailOptions = {
                from: '',
                to: email,
                subject: `Account activation link`,
                generateTextFromHTML: true,
                html: output,

            }

            smtpTransport.sendMail(mailOptions, (error, res)=>{
                if(error){
                    res.status(500).json({error: "Error has occurred"});
                    console.log(error);
                }else{
                    res.status(201).json({
                        success: true,
                        user: user,
                        message: `Activation link has been sent to ${email}`
                    });
                }
            })

            smtpTransport.close();
                        }
                    });
            }
});

//---------------------ACTIVATE ACCOUNT------------------//
userRouter.post('/activation',(req,res)=>{
    
    const {token }= req.body
     let errors = [];
     if (token) {
         JWT.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
             if (err) {
                res.status(500).json({error: "Incorrect or expired link! Please register again."});
                console.log(err)

             }
             else {
                const { email,firstName,lastName, address, password,role } = decodedToken;
                User.findOne({email},(err,user)=>{
                    if(err)
                        res.status(500).json({error: "Error has occurred"});
                    if(user)
                        res.status(400).json({error: "Email already exists"});
                    else{
                        const newUser = new User({firstName, lastName,email, password,role, address});
                        
                        newUser
                            .save()
                            . then(user => {
                                res.status(201).json({
                                    success: true,
                                    user: user,
                                    message: 'Account successfully created. Please sing in',
                                });
                            })
                            .catch(err =>  
                                {console.log(err);
                                res.status(500).json({error :`Something went wrong, please try again`})}
                                );
                    }
                });
            }
        })}
     else {
        res.status(400).json({error: "Account activation error!"});
         console.log("Account activation error!")
     }
 })

//--------------LOGIN-------------//

userRouter.post('/login',validLogin, async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {     try {
        console.log(info);
        if(err || !user){
          return res.json({error: `${info.message}`})
        }
        req.login(user, { session : false }, async (error) => {
          if( error ) return next(error)
          const {_id, email, role} = user
          const token = signToken(_id);
          return res.cookie('access_token',token,{httpOnly: true, sameSite:true}), 
          res.status(200).json({isAuthenticated : true,user : {email,role}, message: `${info.message}`});
        });     } catch (error) {
        return next(error);
      }
    })(req, res, next);
  });

//--------------LOGOUT-------------//
userRouter.get('/logout',passport.authenticate('jwt',{session : false}),(req,res)=>{
    res.clearCookie('access_token');
    res.json({user:{username : "", role : ""},success : true});
});

//--------------ADMIN-------------//
userRouter.get('/admin',passport.authenticate('jwt',{session : false}),(req,res)=>{
    if(req.user.role === 'admin'){
        res.status(200).json({message : {msgBody : 'You are an admin', msgError : false}});
    }
    else
        res.status(403).json({message : {msgBody : "You're not an admin,go away", msgError : true}});
});

//-------------------RESET PASSWORD-----------------//
userRouter.put('/forgotpassword',forgotPasswordValidator,(req,res)=>{

    console.log(req.body);
    const {
        email
    } = req.body;

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        const firstError = error.array().map(error=>error.msg)[0]
        return res.status(422).json({
            error: firstError
        })
    }else{
        User.findOne({email}, (err, user)=>{

            if(err)
                res.status(500).json({error: "Error has occurred"});
                    
                
            if(!user)
                res.status(400).json({error: "There is no user with such an email"});

            const token = JWT.sign({ email}, process.env.JWT_RESET_PASSWORD, { expiresIn: '10m' });
            
            let smtpTransport = nodemailer.createTransport({
                service: 'gmail',
                auth:{
                    user: 'hyf.ischool@gmail.com',
                    pass: process.env.GMAIL_PASSWORD
                }

                
            })
            
            // const CLIENT_URL = 'https://ischool-hyf-team.herokuapp.com';
            const CLIENT_URL = 'http://localhost:3000';
            
            const output = `
                <h2 style="color: #000051">Hello ${user.firstName} ${user.lastName}</h2>
                <h1 style="color: #B71C1C">Please click <a href="${CLIENT_URL}/user/password/reset/${token}">here</a> to reset your password</h1>
                <h2 style="color:#000051" ><b style="color:#f9a825">NOTE: </b> The activation link expires in 10 minutes.</h2>
                `;

            

            let mailOptions = {
                from: '',
                to: email,
                subject: `Password Reset link`,
                generateTextFromHTML: true,
                html: output,

            }


            smtpTransport.sendMail(mailOptions, (error, res)=>{
                if(error){
                    res.status(500).json({error: "Error has occurred"});
                    console.log(error);
                }else{
                    res.status(201).json({
                        success: true,
                        user: user,
                        message: `Reset password link has been sent to ${email}`
                    });
                }
            })

            smtpTransport.close();
            
            

        })
    }
});

//---------------FORGOT PASSWORD------------//

userRouter.put('/resetpassword',resetPasswordValidator,(req,res)=>{

    const { token, newPassword } = req.body;
    const errors = validationResult(req);

    console.log(errors)
    if (!errors.isEmpty()) {
      const firstError = errors.array().map(error => error.msg)[0];
      return res.status(422).json({
        errors: firstError
      });
    } else {
      if (token) {
        JWT.verify(token, process.env.JWT_RESET_PASSWORD, (err, decodedToken) => {
            if (err) {
               res.status(500).json({error: "Incorrect or expired link! Please try again."});
               console.log(err)

            }else{
                const { email} = decodedToken;
                User.findOne(
                    {email},
                    (err, user) => {
                        if(err)
                        res.status(500).json({error: "Error has occurred"});
                        if(!user)
                        res.status(400).json({error: "There is no user with such an email"});
          
                      const updatedFields = {
                        password: newPassword
                      };
          
                      user = _.extend(user, updatedFields);
          
                      user.save((err, result) => {
                        if (err) {
                          return res.status(400).json({
                            error: 'Error resetting user password'
                          });
                        }

                        res.status(201).json({
                            success: true,
                            user: user,
                            message: `Great! Now you can login with your new password`
                        });
                      });
                    }
                  );
            }
  
         
        });
      }
    }
})

//--------------AUTHENTICATED-------------//
userRouter.get('/authenticated',passport.authenticate('jwt',{session : false}),(req,res)=>{
    const {email,role} = req.user;
    res.status(200).json({isAuthenticated : true, user : {email,role}});
});





module.exports = userRouter;