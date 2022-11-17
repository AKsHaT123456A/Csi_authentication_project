//jshint esversion:6
require('dotenv').config();
const express = require("express");  
const bodyParser = require("body-parser");
const passport = require('passport');
const nodemailer = require("nodemailer");
const mongoose =require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User=require('./model/userSchema');
const router  = require('./routes/user');
const port = process.env.PORT || 3000
const app =express();
app.use(bodyParser.urlencoded({extended:true}));
express.json({extended:true});
mongoose.connect("mongodb+srv://csi:csi@cluster0.n0rijw0.mongodb.net/userDb",{useNewUrlParser:true}).then(console.log("Connection Successfully")); 
 app.use("/",router);
// console.log(User.findOne({email : "ansihkappuri1919@gmial.com"}));
// const sendOtp = require("./router/otp");
// console.log(sendOtp.verifyOtp);
app.listen(port,function(err){
    if(err)console.log(err);
    else console.log("Server Started");
})