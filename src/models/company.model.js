const { Schema, model } = require('mongoose');

const companySchema = new Schema({
  name: {
    type     : String,
    required : true,
    trim     : true,
    minlength: 2,
    maxlength: 99
  },
  country: {
    type     : String,
    trim     : true,
    uppercase: true
  },
  date: {
    type   : Date,
    default: Date.now
  }
});

const Company = model('company', companySchema);
module.exports = Company;