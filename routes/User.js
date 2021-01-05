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

// userRouter.post('/register',validRegister,(req,res)=>{
//     const { email,firstName,lastName, address, password,role } = req.body;
//     const errors = validationResult(req);
//     if(!errors.isEmpty()){
//         const firstError = errors.array().map(error=> error.msg)[0]
//         return res.status(422).json({
//             error:firstError
//         })
//     }else{
//         User.findOne({email},(err,user)=>{
//             if(err)
//                 res.status(500).json({error: "Error has occurred"});
//             if(user)
//                 res.status(400).json({error: "Email already exists"});
//             else{
//                 const newUser = new User({firstName, lastName,email, password,role, address});
               
//                 newUser
//                     .save()
//                     . then(user => {
//                         res.status(201).json({
//                             success: true,
//                             user: user,
//                             message: 'Account successfully created'
//                         });
//                     })
//                     .catch(err =>  
//                         {console.log(err);
//                         res.status(500).json({error :`Something went wrong, please try again`})}
//                         );
//             }
//         });
//     }
// });

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


            const CLIENT_URL = 'http://' + req.headers.host;

            const output = `
                <h2>Hello ${firstName} ${lastName}</h2>
                <h2>Please click on below link to activate your account</h2>
                <h1 style="color: #000051">Click <a href="${CLIENT_URL}/user/activate/${token}">here</a> to activate your account</h1>'
                <p><b>NOTE: </b> The activation link expires in 30 minutes.</p>
                `;

            let mailOptions = {
                from: '',
                to: email,
                subject: `Account activation link`,
                generateTextFromHTML: true,
                html: output,

            }

            smtpTransport.sendMail(mailOptions, (error, response)=>{
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
userRouter.get('/activate/:token',(req,res)=>{
    const token = req.params.token;
     let errors = [];
     if (token) {
         JWT.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
             if (err) {
                res.status(500).json({error: "Incorrect or expired link! Please register again."});

                res.redirect('/user/register');
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
                                const CLIENT_URL = 'http://localhost:3000'; 
                                // res.status(201).json({
                                //     success: true,
                                //     user: user,
                                //     message: 'Account successfully created',
                                // });
                                // res.redirect(`${CLIENT_URL}/login`)
                                res.redirect(`/login`)
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
          //Sign the JWT token and populate the payload with the user email and id
          const token = signToken(_id);
          
          //Send back the token to the user
          return res.cookie('access_token',token,{httpOnly: true, sameSite:true}), 
          res.status(200).json({isAuthenticated : true,user : {email,role}, message: `${info.message}`});
        });     } catch (error) {
        return next(error);
      }
    })(req, res, next);
  });

userRouter.get('/logout',passport.authenticate('jwt',{session : false}),(req,res)=>{
    res.clearCookie('access_token');
    res.json({user:{username : "", role : ""},success : true});
});


userRouter.get('/admin',passport.authenticate('jwt',{session : false}),(req,res)=>{
    if(req.user.role === 'admin'){
        res.status(200).json({message : {msgBody : 'You are an admin', msgError : false}});
    }
    else
        res.status(403).json({message : {msgBody : "You're not an admin,go away", msgError : true}});
});

userRouter.get('/authenticated',passport.authenticate('jwt',{session : false}),(req,res)=>{
    const {email,role} = req.user;
    res.status(200).json({isAuthenticated : true, user : {email,role}});
});





module.exports = userRouter;