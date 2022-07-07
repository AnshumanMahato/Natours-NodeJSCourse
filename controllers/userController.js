const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});

const filter = (obj, ...allowedKeys) => {
  const newObj = {};
  Object.keys(obj).forEach(key => {
    if (allowedKeys.includes(key)) newObj[key] = obj[key];
  });
  return newObj;
};

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
  if (req.file) filteredObj.photo = req.file.filename;

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

exports.getMe = (req, res, next) => {
  req.params.id = req.user._id;
  next();
};

exports.addUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route has not been implemented! Please use /signup'
  });
};

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
