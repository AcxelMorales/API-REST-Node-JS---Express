const { Schema, model } = require('mongoose');

const carSchema = new Schema({
  company: {
    type: Schema.Types.ObjectId,
    ref : 'company' 
  },
  model: {
    type     : String,
    required : true,
    minlength: 2
  },
  sold: {
    type    : Boolean,
    required: true
  },
  price: {
    type    : Number,
    required: function() {
      return this.sold;
    }
  },
  year: {
    type    : Number,
    required: true,
    max     : 2090
  },
  extras: [String],
  date: {
    type   : Date,
    default: Date.now
  }
});

const Car = model('car', carSchema);
module.exports = Car;