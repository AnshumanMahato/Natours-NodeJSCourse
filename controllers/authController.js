const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const User = require('./../models/userModel');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      ...newUser._doc
    }
  });
});

exports.login = catchAsync(async (req, res, next) => {
  // Get Credentials
  const { email, password } = req.body;

  // Verify input
  if (!email || !password)
    return next(new AppError('Please send your email and password.', 400));

  // Verify Credentials
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.checkPassword(password, user.password)))
    return next(new AppError('Incorrect user or password.', 401));

  // Sign Token

  const token = signToken(user._id);

  res.status(201).json({
    status: 'success',
    token
  });
});
