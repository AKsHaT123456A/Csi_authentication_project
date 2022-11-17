const express=require('express');
const mongoose= require('mongoose');
const bodyparser=require('body-parser');
const cookieParser=require('cookie-parser');
// const db=require('./config/config').get(process.env.NODE_ENV);
const app=express();
const User=require('../model/userSchema');
// const auth=require('./auth');
const auth= require("./auth")
app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());
app.use(cookieParser());
// mongoose.Promise=global.Promise;
// adding new user (sign-up route)
//  const register = async(req,res)=>{
   // taking a user
   function registers(req,res){
   const newuser=new User(req.body);

  if(newuser.password!=newuser.password2) return res.status(400).json({message: "password not match"});

   User.findOne({email:newuser.email},function(err,user){
       if(user) return res.status(400).json({ auth : false, message :"email exits"});

       newuser.save((err,doc)=>{
           if(err) {console.log(err);
               return res.status(400).json({ success : false});}
           res.status(200).json({
               success:true,
               user : doc
           });
       });
   });
};


// login user
// app.post('/api/login', function(req,res){
//     let token=req.cookies.auth;
//     User.findByToken(token,(err,user)=>{
//         if(err) return  res(err);
//         if(user) return res.status(400).json({
//             error :true,
//             message:"You are already logged in"
//         });

//         else{
//             User.findOne({'email':req.body.email},function(err,user){
//                 if(!user) return res.json({isAuth : false, message : ' Auth failed ,email not found'});

//                 user.comparepassword(req.body.password,(err,isMatch)=>{
//                     if(!isMatch) return res.json({ isAuth : false,message : "password doesn't match"});

//                 user.generateToken((err,user)=>{
//                     if(err) return res.status(400).send(err);
//                     res.cookie('auth',user.token).json({
//                         isAuth : true,
//                         id : user._id,
//                         email : user.email
//                     });
//                 });
//             });
//           });
//         }
//     });
// });

// // get logged in user
// app.get('/api/profile',auth,function(req,res){
//         res.json({
//             isAuth: true,
//             id: req.user._id,
//             email: req.user.email,
//             name: req.user.fullname

//         });
// });

// //logout user
//  app.get('/api/logout',auth,function(req,res){
//         req.user.deleteToken(req.token,(err,user)=>{
//             if(err) {
//               console.log(err);
//               return res.status(400).send(err);
//             res.sendStatus(200);}
//         });

//     });


// const PORT=process.env.PORT||3000;
// app.listen(PORT,()=>{
//     console.log(`app is live at ${PORT}`);
// });

module.exports = registers ;