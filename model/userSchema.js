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
      type:String,
      // required:true,
      maxlength:13
    },
    year:{
      type:String,
      required:true,
      maxlength:4
    },
    branch:{
      type:String,
      required:true,

    },
    gender:{
     type:String,
    //  required:true
    },
    mobno:{
      type:String,
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
    },
    otp:{
      type:String,
    },
    
});

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
    }});
   // generate jsonwebtoken
    userSchema.methods.generateToken = async function(res,req) {
      try{
          let token = await jwt.sign({_id:this._id} , process.env.SECRET);
         console.log(token);
        // res.send("")
          return token;  
      } catch(err) {
          res.send("This is a error" + err)
          console.log(err);
      }
  }
userSchema.statics.findByToken=async(token,cb) => {
  var user=this;
  jwt.verify(token,process.env.SECRET,function(err,decode){
  user.findOne({"_id":decode,"token":token},function(err,user){
    if(err) return cb(err);
    cb(null,user);
  })})};




//delete token
userSchema.methods.deleteToken=function(token,cb){
  var user=this;
  user.update({$unset :{token :1}},function(err,user){
    if(err) return cb(err);
    cb(null,user);
  })
}
module.exports =userSchema;
