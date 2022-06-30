const { promisify } = require('util');
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
    ...req.body
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      name: newUser.name,
      email: newUser.email
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

exports.protect = catchAsync(async function(req, res, next) {
  // 1 Get Token from header
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith('Bearer')) {
    token = authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('Please Login to Continue', 401));
  }

  // 2 Verify Token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decoded);

  // 3 Verify if user exits
  const user = await User.findById(decoded.id);
  if (!user)
    return next(
      new AppError(
        'The user belonging to the token does not exist. Please login with an existing id',
        401
      )
    );

  // 4 Verify if user has changed passwords
  if (user.isPasswordChanged(decoded.iat))
    return next(
      new AppError('Password has been changed recently. Please Login Again')
    );

  // User Verified Successfully
  next();
});
