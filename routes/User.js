const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const bcryptjs = require('bcryptjs');
const nodemailer = require('nodemailer');
const JWT = require('jsonwebtoken');
const User = require('../models/User');
const School = require('../models/School');
const { OAuth2Client } = require('google-auth-library')
const { validRegister, validLogin, forgotPasswordValidator, resetPasswordValidator} = require('../helpers/valid')
const { validationResult} = require('express-validator');


const signToken = userID =>{
    return JWT.sign({
        iss : "iSchool",
        sub : userID
    },process.env.JWT_SECRET,{expiresIn : "7d"});
}



//-------------------REGISTER-----------------//
userRouter.post('/register',validRegister,(req,res)=>{
    const { email,firstName,lastName, password,role } = req.body;
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
                const token = JWT.sign({ email,firstName,lastName, password,role}, process.env.JWT_SECRET, { expiresIn: '30m' });

                let smtpTransport = nodemailer.createTransport({
                service: 'gmail',
                auth:{
                    user: 'hyf.ischool@gmail.com',
                    pass: process.env.GMAIL_PASSWORD
                }

                
            })
            
            const CLIENT_URL = 'https://ischool-hyf-team.herokuapp.com';
            // const CLIENT_URL = 'http://localhost:3000';

            const output = `
                <h1 style="color: #000051">Hello ${firstName} ${lastName}</h1>
                <h2 style="color: #000051">You are receiving this email, because you have asked to register an account at <a href="https://ischool-hyf-team.herokuapp.com/">iSchool</a>.</h2> 
                <h2 style="color: #000051">Please click button bellow to activate your account</h2>
                <div><button style="color: #ffff; background:#000051; border: 3px solid #000051; border-radius: 10px; font-size:30px; width: 200px"><a style="color: #ffff; text-decoration: none" href="${CLIENT_URL}/user/activate/${token}">ACTIVATE ACCOUNT</a></button></div>
                <h2 style="color:#000051"><b style="color:#f9a825">NOTE: </b> The activation link expires in 30 minutes.</h2>
                <h2 style="color: #000051">Sincerely,  <a href="https://ischool-hyf-team.herokuapp.com/">iSchool</a>  team</h2>
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
userRouter.post('/activation',(req,res)=>{
    
    const {token }= req.body
     if (token) {
         JWT.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
             if (err) {
                res.status(500).json({error: "Incorrect or expired link! Please register again."});
                console.log(err)

             }
             else {
                const { email,firstName,lastName, password,role } = decodedToken;
                User.findOne({email},(err,user)=>{
                    if(err)
                        res.status(500).json({error: "Error has occurred"});
                    if(user)
                        res.status(400).json({error: "Email already exists"});
                    else{
                        const newUser = new User({firstName, lastName,email, password,role});
                        
                        newUser
                            .save()
                            . then(user => {
                                res.status(201).json({
                                    success: true,
                                    user: user,
                                    message: 'Account successfully created. Please sign in',
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
          const {_id, email, role, firstName, lastName, listOfSchools} = user
          const token = signToken(_id);
          return res.cookie('access_token',token,{httpOnly: true, sameSite:true}), 
          res.status(200).json({isAuthenticated : true,user : {email,role,_id, firstName, lastName, listOfSchools}, message: `${info.message}`});
        });     } catch (error) {
        return next(error);
      }
    })(req, res, next);
  });

//--------------LOGOUT-------------//
userRouter.get('/logout',passport.authenticate('jwt',{session : false}),(req,res)=>{
    res.clearCookie('access_token');

    res.json({user:{email : "", role : "", _id:'', firstName: "", lastName:"", listOfSchools:""},success : true});

});

//--------------ADMIN-------------//
userRouter.get('/admin',passport.authenticate('jwt',{session : false}),(req,res)=>{
    if(req.user.role === 'admin'){
        res.status(200).json({message : {msgBody : 'You are an admin', msgError : false}});
    }
    else
        res.status(403).json({message : {msgBody : "You're not an admin", msgError : true}});
});

//-------------------RESET PASSWORD-----------------//
userRouter.put('/forgotpassword',forgotPasswordValidator,(req,res)=>{
    const {
        email
    } = req.body;

    console.log(email)

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        const firstError = errors.array().map(error=>error.msg)[0]
        return res.status(422).json({error: `${firstError}`})
    }else{
        User.findOne({email}, (err, user)=>{

            if(err){
                return res.status(500).json({error: "Error has occurred"});
            }
            
            if(!user) {
                res.status(400).json({error: "There is no user with such an email"});
            } else {
                        const token = JWT.sign({ _id: user._id}, process.env.JWT_RESET_PASSWORD, { expiresIn: '10m' });
                    
                    let smtpTransport = nodemailer.createTransport({
                        service: 'gmail',
                        auth:{
                            user: 'hyf.ischool@gmail.com',
                            pass: process.env.GMAIL_PASSWORD
                        }

                        
                    })
                    
                    const CLIENT_URL = 'https://ischool-hyf-team.herokuapp.com';
                    // const CLIENT_URL = 'http://localhost:3000';
                    
                    const output = `
                        <h2 style="color: #000051">Hello ${user.firstName} ${user.lastName}</h2>    
                        <h2 style="color: #000051">You are receiving this email, because you have asked to reset your password for the account at <a href="https://ischool-hyf-team.herokuapp.com/">iSchool</a>.</h2> 
                        <h2 style="color: #000051">Please click button bellow to reset your password</h2>
                        <div><button style="color: #ffff; background:#000051; border: 3px solid #000051; border-radius: 10px; font-size:30px; width: 200px"><a style="color: #ffff; text-decoration: none" href="${CLIENT_URL}/user/password/reset/${token}">RESET PASSWORD </a></button></div>
                        <h2 style="color:#000051" ><b style="color:#f9a825">NOTE: </b> The link to reset your password expires in 10 minutes.</h2>
                        <h2 style="color: #000051">Sincerely,  <a href="https://ischool-hyf-team.herokuapp.com/">iSchool</a>  team</h2>
                        `;

                    let mailOptions = {
                        from: '',
                        to: email,
                        subject: `Password Reset link`,
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
                                message: `Reset password link has been sent to ${email}`
                            });
                        }
                    })

                    smtpTransport.close();
                    }
            
            
        })
    }
});

//---------------FORGOT PASSWORD------------//

userRouter.put('/resetpassword',resetPasswordValidator,(req,res)=>{

    let { token, newPassword } = req.body;
    const errors = validationResult(req);

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
                const { _id} = decodedToken;
                bcryptjs.hash(newPassword,10, (err, hash) => {
                    if (err) throw err;
                    newPassword = hash;
                    User.findByIdAndUpdate(
                        {_id},
                        { password: newPassword },
                        function (err, result) {
                            if (err) {
                                if(err)
                                res.status(500).json({error: `Error resetting password!`});
                            } else {
                                res.status(201).json({
                                success: true,
                                message: `Great! Now you can login with your new password`
                            });
                            }
                        }
                    );
                })
            }
        });
      }
    }
})

// ------------------GOOGLE LOGIN ----------------//
userRouter.post('/googlelogin',(req,res)=>{
const client = new OAuth2Client(process.env.GOOGLE_CLIENT)
const {idToken} = req.body;
// verify token
client.verifyIdToken({idToken, audience: process.env.GOOGLE_CLIENT})
.then(response =>{
    const {email_verified, given_name, family_name, email} = response.payload;
    // check if email verified
    if(email_verified){
        User.findOne( {email},(err, user) =>{
            // if user exist
            if(user){
                const {_id, email, role} = user
                const token = signToken(_id);
                return res.cookie('access_token',token,{httpOnly: true, sameSite:true}), 
                res.status(200).json({isAuthenticated : true,user : {email,role,_id}});
            }else{
                // if user not exist - save to database 
                let password = email + process.env.JWT_SECRET;
                let role = "user";
                const newUser = new User({firstName:given_name, lastName:family_name,email, password,role});
                        newUser
                            .save()
                            . then(user => {
                                const {_id, email, role} = user
                                const token = signToken(_id);
                                return res.cookie('access_token',token,{httpOnly: true, sameSite:true}), 
                                res.status(200).json({isAuthenticated : true,user : {email,role,_id}});
                            })
                            .catch(err =>  
                                {console.log(err);
                                res.status(500).json({error :`Something went wrong, please try again`})}
                                );
            }
        })
    }else{
        return res.status(400).json({
            error: "Google login failed, try again"
        })
    }

})


})

//--------------AUTHENTICATED-------------//
userRouter.get('/authenticated',passport.authenticate('jwt',{session : false}),(req,res)=>{
    const {email,role, _id, listOfSchools, firstName, lastName} = req.user;
    res.status(200).json({isAuthenticated : true, user : {email,role, _id, listOfSchools, firstName, lastName}});
});





module.exports = userRouter;