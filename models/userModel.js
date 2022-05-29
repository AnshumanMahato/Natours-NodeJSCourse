const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
    trim: true,
    maxlength: [30, 'Name must be of less than 30 characters']
  },
  email: {
    type: String,
    required: [true, 'A User must have an email.'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid email']
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [8, 'Password must be longer than 8 characters']
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function(el) {
        return this.password === el;
      },
      message: 'Passwords do not match'
    }
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
