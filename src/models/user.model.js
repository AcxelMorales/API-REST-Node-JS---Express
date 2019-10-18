const { Schema, model } = require('mongoose');

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
  date: {
    type   : Date,
    default: Date.now
  }
});

const User = model('user', userSchema);
module.exports = User;