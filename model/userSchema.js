const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const salt=10;
const mongoose= require('mongoose');
const userSchema=mongoose.Schema({
  firstname:{
        type: String,
        required: true,
        maxlength: 100
    },
    lastname:{
        type: String,
        required: true,
        maxlength: 100
    },
    rollno:{
      type:Number,
      required:true,
      maxlength:30
    },
    year:{
      type:Number,
      required:true,
      maxlength:4
    },
    branch:{
      type:String,
      required:true,

    },
    mobno:{
      type:Number,
      maxlength:10,
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    password:{
        type:String,
        required: true,
        minlength:8
    },
    password2:{
        type:String,
        required: true,
        minlength:8

    },
    token:{
        type: String
    },
    is_verified:{
      type:Number,
      default:0
    },
    
});
const User = mongoose.model('User',userSchema);
module.exports = User;
// userSchema.pre('save',function(next){
//   var user=this;
//   if(user.isModified('password')){
//     bcrypt.genSalt(salt,function(err,salt){
//       if(err) return next(err);
//       bcrypt.hash(user.password,salt,function(err,hash){
//         if(err) return next(err);
//         user.password=hash;
//         user.password2=hash;
//         next();
//       })
//    })
//   }
//   else{
//     next();
//   }
// });




// userSchema.methods.comparepassword=function(password,cb){
//   bcrypt.compare(password,this.password,function(err,isMatch){
//     if(err) return cb(next);
//     cb(null,isMatch);
//   });
// }
// //generate jsonwebtoken
// userSchema.methods.generateToken=function(cb){
//   var user=this;
//   var token=jwt.sign(user._id.toHexString(),config.SECRET);
//   user.token=token;
//   user.save(function(err,user){
//     if(err) return cb(err);
//     cb(null,user);
//   })
// }
// //find by token
// userSchema.statics.findByToken=function(token,cb){
//   var user=this;
//   jwt.verify(token,config.SECRET,function(err,decode){
//   user.findOne({"_id":decode,"token":token},function(err,user){
//     if(err) return cb(err);
//     cb(null,user);
//   })
//   })
// };
// //delete token
// userSchema.methods.deleteToken=function(token,cb){
//   var user=this;
//   user.update({$unset :{token :1}},function(err,user){
//     if(err) return cb(err);
//     cb(null,user);
//   })
// }