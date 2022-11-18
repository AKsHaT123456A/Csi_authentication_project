
//  var verifyOtp = Otp.toString();
const express = require("express");
const mongoose = require("mongoose")
const userSchema = require("../model/userSchema");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const app = express();
const User = mongoose.model('User',userSchema);
var Otp = Math.floor(1000 + Math.random() * 9000);

// const userData = User.save()
express.json({extended:true});
app.use(bodyParser.urlencoded({extended:true}));
const sendVerifyMail = async (req,res)=>{
   const userData = User.findOne({email:req.body.email}, function(err, result) {
    if (err) throw err;
    else {
    console.log(result);
    // module.exports.result =result
 
    // console.log(userData);
// conso le.log(user.password);
  try {
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
  
    let info =  transporter.sendMail({
      from: 'akshat.akshat.srajan@gmail.com',
      to:userData.email,
      subject:"Verification", 
      text: "", 
       html:Otp +" is the otp for verifcation",
    });  
    console.log("sent");
  }catch (error) {
    console.log(error);
  }}});
  }

  
    //in register api
     //sendVerifyMail(req.body.email,User._id)
      //  res.redirect("/otp")    
      function otpChecker(req,res){
       console.log(req.body.Otp);
      if(Otp == req.body.Otp)
      {
              const updatedInfo = User.updateOne({_id:req.query.id},{$set:{is_verified:1} });
              console.log(updatedInfo);
              res.send("Otp sent");
      }
            
     else{
      console.log(Otp);
      res.send("Not send")
     }}
    
        
         
// app.post("/verified",function(req,res){
  

module.exports.Otp = Otp;
module.exports = {otpChecker,sendVerifyMail}






































  // let transporter = nodemailer.createTransport({
          //   host: "smtp.gmail.com",
          //   port: 587,
          //   secure: false,
          //   requireTLS:true,
          //   auth: {
          //     user: "akshat.akshat.srajan@gmail.com", 
          //     pass: process.env.EMAIL_TEST_PASSWORD,  
          //   },
          // });
        
          // let info =  transporter.sendMail({
          //   from: '"Team CSI" akshat.akshat.srajan@gmail.com',
          //   to:  req.body.username,
          //   subject: "Verification", 
          //   text: "", 
          //    html: verifyOtp +" is the otp for verifcation"
          // });




















//reset
    // const oldUser = passVerification.findOne({email});
    // console.log(oldUser.password);
    // const secret =process.env.JWT_SECRET +oldUser.password;
    // const Verification = passVerification.findOne({});
   
    //  const token = jwt.sign({email:Verification.email,id:Verification._id},secret,{expiresIn:"5m",
    // });
    // const link = `http://localhost:3000/reset-password/${oldUser._id}/${token}`;
// });

//   if(isVerified){
//     if(verifyOtp = req.body.otp){
//       res.redirect("/")
//     }
//     else console.log("Invalid OTP");
//   }
//   else console.log("Wrong entry");
  
// });

// app.get("/reset-password/:id/:token",function(req,res){
//   const {id,token} = req.params;
//   console.log(req.params);
//   const Verification = passVerification.findOne({});
//   const oldUser = Verification.email;
//   console.log(oldUser);
//   if(!oldUser){
//     console.log("Not");
//   }
//   const secret =process.env.JWT_SECRET +Verification.password;
//   try {
//     const verify = jwt.verify(token,secret);
//     console.log("verified");
//   } catch (err) {
//     console.log(err);
//     console.log("not verified");
    
//   }
// });
// app.post("/reset-password/:id/:token",function(req,res){
//   const {id,token} = req.params;
//   const password = req.body
//   const Verification = passVerification.findOne({});
//   const oldUser = Verification.email;
//   if(!oldUser){
//     console.log("Not");
//   }
//   const secret =process.env.JWT_SECRET +Verification.password;
  
//   try {
//     // const token = req.headers.authorization.split(' ')[1];
//     jwt.verify(token,secret)
//     console.log(secret);
//     console.log(token);

//     const encryptedPass =  bcrypt.hash(password,10);
//      passVerification.updateOne({
//       _id:id,
//     },
//     {
//       $set:{
//         password:encryptedPass,
//       },
//     });
//     console.log("password");
//   } catch (err) {
//     console.log(err);
//     console.log("not password");
    
//   }
// });
// const resetSchema = new mongoose.Schema({
//     email:String,
//     password:String,
//     otp:String,
// });

// const passVerification = mongoose.model("passVerification",resetSchema);
// app.post("/",function(req,res){
//   passVerification({
//     email:req.body.email,
//     password:req.body.password,
//   });
// });
  // const email = req.body;

  //nodemailer
  // console.log("Message sent: %s", info.messageId);
        
          // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
          ///verification
          // const verification = async(req,res) =>{
          //   try {
          //     res.redirect("/home")
          //   } catch (error) {
          //          console.log(error);    
          //   }
          // }