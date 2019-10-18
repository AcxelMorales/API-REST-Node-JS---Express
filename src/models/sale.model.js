const { Schema, model } = require('mongoose');

const saleSchema = new Schema({
  user: {
    type    : Schema.Types.ObjectId,
    ref     : 'user',
    required: true
  },
  car: {
    type    : Schema.Types.ObjectId,
    ref     : 'car',
    required: true
  },
  price: {
    type    : Number,
    required: true
  },
  date: {
    type   : Date,
    default: Date.now
  }
});

const Sale = model('sale', saleSchema);
module.exports = Sale;