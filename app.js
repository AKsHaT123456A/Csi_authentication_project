//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const session = require('express-session');
const passport = require('passport');
const nodemailer = require("nodemailer");
const mongoose =require('mongoose');
const bcrypt = require("bcrypt");
const app =express();
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));
app.set("view engine","ejs");
app.use(session({
    secret:"This is a secret.",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/loginDB",{useNewUrlParser:true});

const resetSchema = new mongoose.Schema({
    email:String,
    password:String,
});
const link = "http://localhost:3000/"
app.get("/reset",function(req,res){
});
app.post("/reset",function(req,res){
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
              to:  req.body.username,
              subject: "Password Reset", 
              text: "Hello", 
              html: req.body.password, 
            });
          
            console.log("Message sent: %s", info.messageId);
          
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
          }
          
          main().catch(console.error);
    });
    passVerification.register({username:req.body.username},req.body.password,function(err,user){
        if (err){
            console.log(err);   
            res.redirect("/register");
        }else{
           
        }
    });  
});
app.get("/auth/google",
passport.authenticate('google',{scope:["profile"]

}));
app.get('/auth/google/verify', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/register');
  });



