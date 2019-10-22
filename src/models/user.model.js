const { Schema, model } = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
  name: {
    type     : String,
    required : true,
    trim     : true,
    minlength: 3
  },
  isCustomer: Boolean,
  email: {
    type    : String,
    required: true,
    trim    : true,
    unique  : true
  },
  password: {
    type     : String,
    required : true,
    trim     : true,
    minlength: 6
  },
  isAdmin: Boolean,
  role: String,
  date: {
    type   : Date,
    default: Date.now
  }
});

//****************************************************************************
//  JWT
//****************************************************************************
userSchema.methods.generateJWT = function() {
  return jwt.sign({
    _id    : this._id,
    name   : this.name,
    isAdmin: this.isAdmin,
    role   : this.role
  }, process.env.SECRET_KEY_JWT_CAR_API || 'private-seed');
}

const User = model('user', userSchema);
module.exports = User;