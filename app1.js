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

 const port = 3000||process.env.PORT;
const app =express();
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));
app.use(express.json());
app.set("view engine","ejs");
app.get("/",function(req,res){
    res.render("captcha")
})
app.post("/",function(req,res)
{
    const {email,password} = req.body;
    res.redirect("/login")
});
app.listen(port,function(err){
    if(err)console.log(err);
    else console.log("Server Started");
})