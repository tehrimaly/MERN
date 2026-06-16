const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: String, required: true },
  priceNum: { type: Number, required: true },
  specs: [{ type: String }],
  category: { type: String, required: true },
  badge: { type: String, default: '' },
  img: { type: String, required: true }
});

module.exports = mongoose.model('Car', carSchema);