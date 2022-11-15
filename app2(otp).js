//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const session = require('express-session');
const passport = require('passport');
const nodemailer = require("nodemailer");
const findOrCreate = require('mongoose-findorcreate')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passportLocalMongoose = require('passport-local-mongoose');
const mongoose =require('mongoose');
const bcrypt = require("bcrypt");
const app =express()
var Otp = Math.floor(1000 + Math.random() * 9000);
var verifyOtp = Otp.toString();
 
console.log(verifyOtp);
const resetSchema = new mongoose.Schema({
  email:String,
  password:String,
});

const passVerification = mongoose.model("passVerification",resetSchema);

    app.post("/reset",function(req,res){
        const email = req.body.email;
       // const otp = req.body.otp;
        passport.authenticate("local")(req,res,function(){
            async function main() {
                
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
                  to:  req.body.email,
                  subject: "Password Reset", 
                  text: verifyOtp, 
                 /// html: req.body.password, 
                });
              
                console.log("Message sent: %s", info.messageId);
              
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
              }
              
              main().catch(console.error);
              //const otp = req.body.otp;

              // if(verifyOtp === otp)
              // {
              //   res.redirect("/")
              // }
              // else{
              //   console.log("Invalid otp");
              // }
        });
    
})









app.listen(3000,function(err){
    if(err)console.log(err);
    else console.log("Server Started");
});