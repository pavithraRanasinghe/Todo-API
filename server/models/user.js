const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        default: null,
        trim: true,
        minlength: 5,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password:{
        type:String,
        required:true,
        minlength: 8
    },
    tokens:[{
        access:{
            type: String,
            required:true
        },
        token:{
            type: String,
            required:true
        }
    }]
});

UserSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
};


UserSchema.methods.generateAuthToken = function () {
    let user = this;
    let access = 'auth';
    let token = jwt.sign({_id: user._id.toHexString(),access}, 'abc123').toString();

    user.tokens.push({access,token});

    return user.save().then(()=>{
        return token;
    });
}

UserSchema.statics.findByToken = function (token) {
    const User = this;
    let decoded;

    try{
        decoded =jwt.verify(token , 'abc123');
    }catch (e) {
        return Promise.reject();
    }

    return User.findOne({
        '_id':decoded._id,
        'tokens.token':token,
        'tokens.access':'auth'
    });
};

UserSchema.statics.findByCredentials = function(email,password){
  const User =this;
  console.log(email);
    return User.findOne({email}).then((user) => {
        console.log(user);
        if (!user) {
            return Promise.reject();
        }
      return new Promise((resolve,reject)=>{
          console.log("Compare");
          bcrypt.compare(password,user.password,(err,res)=>{
              if (res){
                  resolve(user);
              }else{
                  reject();
              }
          });
      });
    });
};

UserSchema.pre('save',function (next) {
    var user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(10,(err,salt)=>{
           bcrypt.hash(user.password,salt,(err,hash)=>{
               user.password = hash;
               next();
           })
        });
    }else{
        next();
    }
})

const User = mongoose.model('user', UserSchema);

module.exports = User;
