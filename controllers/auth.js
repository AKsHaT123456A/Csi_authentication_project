const mongoose  = require('mongoose');
const userSchema=require('../model/userSchema');
const User = mongoose.model('User',userSchema);
let auth=(req,res,next)=>{
  let token=req.cookies.jwt;
  const verifyUser = jwt.verify(token,process.env.SECRET);
  console.log(verifyUser);
  User.findByToken(token,(err,user)=>{
    if(err) throw err;
    if(!user) return res.json({
      error: true
    });
    req.token=token;
    req.user=user;
    next();
  });
}
module.exports={auth};
