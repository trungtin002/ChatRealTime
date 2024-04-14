var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var config = require('../config/config');

var userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    username:{
        type:String,     
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        enum:['male','female'],
        
    },
    profilePic: {
        type: String,
        default: "",
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {timestamps:true}
);

userSchema.pre('save', function(){
    if(this.isModified('password')){
        this.password = bcrypt.hashSync(this.password, 10);
    }
})

userSchema.methods.genJWT = function () {
    return jwt.sign({
        id: this._id
    }, config.JWT_SECRETKEY, { expiresIn: config.JWT_EXP })
}

module.exports = new mongoose.model('user',userSchema);