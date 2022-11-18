//jshint esversion:6
require('dotenv').config();
const express = require("express");  
const bodyParser = require("body-parser");
const passport = require('passport');
const nodemailer = require("nodemailer");
const mongoose =require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema=require('./model/userSchema');
const router  = require('./routes/user');
const port = process.env.PORT || 3000 ;
const app =express();
mongoose.connect("mongodb+srv://csi:csi@cluster0.n0rijw0.mongodb.net/userDb",{useNewUrlParser:true}).then(console.log("Connection Successfully"));
const cookieParser=require('cookie-parser');
// const db=require('./config/config').get(process.env.NODE_ENV);
const {auth}=require('./controllers/auth');
// const { isMatch } = require('lodash');
app.use("/",router)
const User = mongoose.model('User',userSchema);
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(cookieParser());
// mongoose.Promise=global.Promise;
// adding new user (sign-up route)

app.post('/register',function(req,res){
   // taking a user
   const newuser=new User(req.body);

  if(newuser.password!=newuser.password2) return res.status(400).json({message: "password not match"});

   User.findOne({email:newuser.email},function(err,user){
       if(user) return res.status(400).json({ auth : false, message :"email exits"});
       else console.log(err);
       newuser.save((err,doc)=>{
           if(err) {console.log(err);
               return res.status(400).json({ success : false});}
           res.status(200).json({
               success:true,
               user : doc
           });
       });
   });

  
});


//logout user
 app.get('/logout',auth,function(req,res){
        req.body.deleteToken(req.token,(err,user)=>{
            if(err) {
              console.log(err);
              return res.status(400).send(err);
            res.sendStatus(200);}
        });

    });
    // get logged in user
app.get('/profile',auth,function(req,res){
   res.json({
      isAuth: true,
      id: req.user._id,
      email: req.user.email,
      name: req.user.fullname

  });
});

app.post("/login",async(req,res)=>{
  try {
     let token;
     const {email , password} = req.body;
     if(!email || !password){
      return res.send("Fill the Details")
     }
     const userLogged = await User.findOne({email:email});
     console.log(userLogged);
     if(userLogged){
      console.log(userLogged.password2);
      const token = await userLogged.generateToken();
      console.log(token);
      res.cookie("jwttoken",token,{
        expires:new Date(Date.now()+10000000)
      });
      if(password === userLogged.password2){
        res.send("Matched")        }
      else{
        // loginFlag = User.updateOne
        res.status(200).send("Incorrect") }
      }else{
        res.status(200).send("Not matched")
      }
     }
   catch (error) {
      console.log(error);  
  }
})


app.listen(port,()=>{
    console.log(`app is live at ${port}`);
});









