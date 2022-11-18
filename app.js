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
app.use("/",router)
const User = mongoose.model('User',userSchema);
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(cookieParser());
// mongoose.Promise=global.Promise;
// adding new user (sign-up route)
userSchema.pre('save',function(next){
    var user=this;
    if(user.isModified('password')){
      bcrypt.genSalt(salt,function(err,salt){
        if(err) return next(err);
        bcrypt.hash(user.password,salt,function(err,hash){
          if(err) return next(err);
          user.password=hash;
          // user.password2=hash;
          next();
        })
     })
    }
    else{
      next();
    }
    userSchema.methods.comparepassword=function(password,cb){
        bcrypt.compare(password,this.password,function(err,isMatch){
          if(err) return cb(next);
          cb(null,isMatch);
        });
      }
      //generate jsonwebtoken
      userSchema.methods.generateToken=function(cb){
        var user=this;
        var token=jwt.sign(user._id.toHexString(),process.env.JWT_SECRET);
        user.token=token;
        user.save(function(err,user){
          if(err) return cb(err);
          cb(null,user);
        })
      }
  });
     //find by token
userSchema.statics.findByToken=function(token,cb){
    var user=this;
    jwt.verify(token,process.env.JWT_SECRET,function(err,decode){
    user.findOne({"_id":decode,"token":token},function(err,user){
      if(err) return cb(err);
      cb(null,user);
    })})};
app.get('/register',function(req,res){
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

// login user
// app.get('/login', function(req,res){
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


// get logged in user
// app.get('/api/profile',auth,function(req,res){
//         res.json({
//             isAuth: true,
//             id: req.user._id,
//             email: req.user.email,
//             name: req.user.fullname

//         });
// });

//logout user
 app.get('/logout',auth,function(req,res){
        req.body.deleteToken(req.token,(err,user)=>{
            if(err) {
              console.log(err);
              return res.status(400).send(err);
            res.sendStatus(200);}
        });

    });

app.get("/login",async(req,res)=>{
  try {
     let token;
     const {email , password} = req.body;
     if(!email || !password){
      return res.send("success")
     }
     const userLogged = await User.findOne({email:email})
  } catch (error) {
    
  }
})


app.listen(port,()=>{
    console.log(`app is live at ${port}`);
});









