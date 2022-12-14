const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const passport = require("passport");
const app = express();
express.json({extended:true})
app.use(bodyParser.urlencoded({extended:true}));
const userSchema= require("../model/userSchema");
// const result = require("../controllers/otp")
const nodemailer = require("nodemailer");
const User = mongoose.model('User',userSchema);

// const { result } = require("lodash");
// const forget =function(req,res){
//     try {
//         res.redirect("/forget");
//     } catch (error) {console.log(error);
        
//     }
// }
const forgetVerify = async(req,res) =>
{
    try {
      // User.findOne({email:req.body.email}, function(err, result) {
      //   if (err) throw err;
      //   else {flag++
      //   console.log(result.password2);
      // }});    
          // if(flag){
            passport.authenticate("local")(req,res,function(){
              User.updateOne({email:req.body.email},{$set:{isverified:1}});
              userData = User.findOne({email:req.body.email},function(err,result){
                if(err)console.log(err);
                  console.log(result);});
                
                async function main(userData) {
                  if(userData.isverified){
                    let testAccount =  nodemailer.createTestAccount(); 
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
                    User.findOne({email:req.body.email}, function(err, result) {
                      if (err) throw err;
                      else {
                      console.log(result);
                      // module.exports.result =result
                    }
                    let info =  transporter.sendMail({
                      from: '"Team CSI" akshat.akshat.srajan@gmail.com',
                      to:  req.body.email,
                      subject: "Password Reset", 
                      text: "Hello", 
                      html: "This is your password"+ result.password2, 
                      
                    })});
                     console.log("sent");
                  
                    // console.log("Message sent: %s", info.messageId);
                  
                    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                  
                  
                  main().catch(console.error);
                  }
                else res.send("OTP send")
                }}
            )
                // }

        // else{
        //     res.redirect("/register")
        // }
        
    } catch (error) {
     console.log(error);
    }
};


module.exports = {forgetVerify};