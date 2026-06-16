const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, default: '' },
  femail: { type: String, required: true },
  fcar: { type: String, default: 'General Inquiry' },
  fmessage: { type: String, default: '' },
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Contact', contactSchema);