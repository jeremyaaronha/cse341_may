const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
    lowercase: true
  },
  favoriteColor: {
    type: String,
    required: true,
    minlength: 2
  },
  birthday: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Contact', contactSchema, 'Contacts');