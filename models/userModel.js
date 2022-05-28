const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A User must have a name'],
    trim: true,
    maxlength: [30, 'Name must be of less than 30 characters']
  },
  email: {
    type: String,
    required: [true, 'A User must have an email.'],
    unique: true
  },
  photo: {
    type: String,
    required: [true, 'User must have a profile photo']
  },
  password: {
    type: String,
    required: [true, 'Password is mandatory'],
    minlength: [8, 'Password must be longer than 8 characters']
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Password is mandatory']
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
