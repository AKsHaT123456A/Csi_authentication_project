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
const port = 3000;
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

resetSchema.plugin(passportLocalMongoose);
resetSchema.plugin(findOrCreate);
const passVerification = mongoose.model("passVerification",resetSchema);
// used to serialize the user for the session
passport.serializeUser(function(user, done) {
    done(null, user.id); 
   // where is this user.id going? Are we supposed to access this anywhere?
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/verify",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.get("/register",function(req,res){
})
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



app.listen(3000,function(err){
    if(err)console.log(err);
    else console.log("Server Started");
})