const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const salt=10;
const mongoose= require('mongoose');
const userSchema=mongoose.Schema({
  fullname:{
        type: String,
        required: true,
        maxlength: 100
  },
    rollno:{
      type:Number,
      // required:true,
      maxlength:13
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
    gender:{
     type:String,
     required:true
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
    loginFlag:{
      type:Number,
      default:0
    }
    
});






// //delete token
// userSchema.methods.deleteToken=function(token,cb){
//   var user=this;
//   user.update({$unset :{token :1}},function(err,user){
//     if(err) return cb(err);
//     cb(null,user);
//   })
// }
module.exports =userSchema;
