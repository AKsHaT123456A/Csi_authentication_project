//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const passport = require('passport');
const nodemailer = require("nodemailer");
const mongoose =require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
 const app =express();
 var isVerified = Boolean(false);
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb+srv://csi:csi@cluster0.n0rijw0.mongodb.net/userDb",{useNewUrlParser:true}).then(console.log("Connection Successfully"));

const resetSchema = new mongoose.Schema({
    email:String,
    password:String,
    otp:String,
});

const passVerification = mongoose.model("passVerification",resetSchema);
app.get("/reset",function(req,res){
    const email = req.body;
    
        const oldUser = passVerification.findOne({email});
        console.log(oldUser.password);
        const secret =process.env.JWT_SECRET +oldUser.password;
        const Verification = passVerification.findOne({});
       
         const token = jwt.sign({email:Verification.email,id:Verification._id},secret,{expiresIn:"5m",
        });
        const link = `http://localhost:3000/reset-password/${oldUser._id}/${token}`;
        passport.authenticate("local")(req,res,function(){
          
          async function main() {
            let Otp = Math.floor(1000 + Math.random() * 9000);
            let verifyOtp = Otp.toString();
              isVerified = Boolean(true); 
              let testAccount = await nodemailer.createTestAccount();
            
             
              let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                requireTLS:true,
                auth: {
                  user: "akshat.akshat.srajan@gmail.com", 
                  pass: process.env.EMAIL_TEST_PASSWORD,  
                },
              });
            
              let info = await transporter.sendMail({
                from: '"Team CSI" akshat.akshat.srajan@gmail.com',
                to:  req.body.username,
                subject: "Reset-password", 
                text: "Link to reset your password", 
                 html: link
              });
              
              // console.log("Message sent: %s", info.messageId);
            
              // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            }
            
            main().catch(console.error);
            
      });
});
app.get("/reset-password/:id/:token",function(req,res){
    const {id,token} = req.params;
    console.log(req.params);
    const Verification = passVerification.findOne({});
    const oldUser = Verification.email;
    console.log(oldUser);
    if(!oldUser){
      console.log("Not");
    }
    const secret =process.env.JWT_SECRET +Verification.password;
    try {
      const verify = jwt.verify(token,secret);
      console.log("verified");
    } catch (err) {
      console.log(err);
      console.log("not verified");
      
    }
  });
  app.post("/reset-password/:id/:token",function(req,res){
    const {id,token} = req.params;
    const password = req.body
    const Verification = passVerification.findOne({});
    const oldUser = Verification.email;
    if(!oldUser){
      console.log("Not");
    }
    const secret =process.env.JWT_SECRET +Verification.password;
    
    try {
      // const token = req.headers.authorization.split(' ')[1];
      jwt.verify(token,secret)
      console.log(secret);
      console.log(token);
  
      const encryptedPass =  bcrypt.hash(password,10);
       passVerification.updateOne({
        _id:id,
      },
      {
        $set:{
          password:encryptedPass,
        },
      });
      console.log("password");
    } catch (err) {
      console.log(err);
      console.log("not password");
      
    }
  });
  

  app.listen(3000,function(err){
    if(err)console.log(err);
    else console.log("Server Started");
});