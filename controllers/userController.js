const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const filter = (obj, ...allowedKeys) => {
  const newObj = {};
  Object.keys(obj).forEach(key => {
    if (allowedKeys.includes(key)) newObj[key] = obj[key];
  });
  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users
    }
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  //Check that user does not send password
  if (req.body.password || req.body.passwordConfirm)
    return next(
      new AppError(
        'Password update is not allowed on this route. Use /updateMyPassword',
        400
      )
    );
  //Filter allowed fields
  const filteredObj = filter(req.body, 'name', 'email');

  //update user
  const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredObj, {
    new: true,
    runValidators: true
  });

  //send updated user
  res.status(200).json({
    status: 'success',
    data: {
      updatedUser
    }
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  //set active status to false
  await User.findByIdAndUpdate(req.user._id, { active: false });

  //send response
  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.addUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route has not been implemented'
  });
};

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route has not been implemented'
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route has not been implemented'
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route has not been implemented'
  });
};
