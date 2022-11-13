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
const jwt =require("jsonwebtoken");
const { userInfo } = require('os');
const port = 3000;
const app =express();
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));
app.set("view engine","ejs");
const resetSchema = new mongoose.Schema({
  email:String,
  password:String,
  resetLink: {String ,default:""},
});
const passVerification = mongoose.model("passVerification",resetSchema);

app.post("/reset",function(req,res){
  const secret = JWT_SECRET + passVerification.password;
    const token = jwt.sign({_id: passVerification._id},secret,{expiresIn:"10m"});
    function forgetPassword(req,res){
      const email = req.body.username
      passVerification.findOne({email}),function(err,user){
        if(err || user){
          console.log("sjks");
        }
        console.log(secret);
        const token =jwt.sign({username:passVerification.username,_id:passVerification._id},secret,{expiresIn: "10m"});
        const link = `http://localhost:3000/reset-password/${passVerification._id}/${token}`
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
            to:  email,
            subject: "Password Reset", 
            text: "Hello", 
            html:link
          });
        
          console.log("Message sent: %s", info.messageId);
        
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        }
        
        main().catch(console.error);
  }}});

app.listen(3000,function(err){
  if(err)console.log(err);
  else console.log("Server Started");
})