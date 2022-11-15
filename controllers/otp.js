
 var isVerified = Boolean(false);
 var Otp = Math.floor(1000 + Math.random() * 9000);
 var verifyOtp = Otp.toString();
const express = require("express");
const User = require("../model/userSchema");
app = express(); 
const sendVerifyMail = async(email,user_id)=>{
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
  
    let info = await transporter.sendMail({
      from: '"Team CSI" akshat.akshat.srajan@gmail.com',
      to:  req.body.username,
      subject: "Verification", 
      text: "", 
       html: verifyOtp +" is the otp for verifcation"
    });  
  }catch (error) {
    console.log(error);
  }
}

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
  try {
  
    // const oldUser = passVerification.findOne({email});
    // console.log(oldUser.password);
    // const secret =process.env.JWT_SECRET +oldUser.password;
    // const Verification = passVerification.findOne({});
   
    //  const token = jwt.sign({email:Verification.email,id:Verification._id},secret,{expiresIn:"5m",
    // });
    // const link = `http://localhost:3000/reset-password/${oldUser._id}/${token}`;
    if(userData)
     {

          isVerified = Boolean(true); 
          // let testAccount = await nodemailer.createTestAccount();
        
         sendVerifyMail(req.body.email,userData._id)
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
            subject: "Verification", 
            text: "", 
             html: verifyOtp +" is the otp for verifcation"
          });
          
          // console.log("Message sent: %s", info.messageId);
        
          // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        }
        main().catch(console.error);
        var userOtp = req.body;
        console.log(userOtp);
  } catch (error) {console.log(error);}
// app.post("/verified",function(req,res){
  const verifyMail =  async(req,res)=>{
    try {
      const updatedInfo = await User.updateOne({_id:req.query.id},{$set:{is_verified:1} });
      console.log(updatedInfo);
      res.redirect("\home");
    } catch (error) {
      console.log(error);
      
    }
  }
// });
  module.exports.verifyOtp = verifyOtp;
  module.exports = verifyMail
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











