const Tour = require('../models/tourModel');
const User = require('../models/userModel');
// const userController = require('./userController');
const Booking = require('../models/bookingModel');
const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.alerts = (req, res, next) => {
  const { alert } = req.query;
  if (alert === 'booking')
    res.locals.alert =
      "Your booking was successful! Please check your email for a confirmation. If your booking doesn't show up here immediatly, please come back later.";
  next();
};

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) Get tour data from collection
  const tours = await Tour.find();

  // 2) Build template
  // 3) Render that template using tour data from 1)
  res.status(200).render('overview', {
    title: 'All Tours',
    tours
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  // 1) Get the data, for the requested tour (including reviews and guides)
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user'
  });

  if (!tour) {
    return next(new AppError('There is no tour with that name.', 404));
  }
  if (req.user) {
    const book = await Booking.findOne({ tour: tour._id, user: req.user._id });
    if (book) tour.isBooked = true;
  }

  // 2) Build template
  // 3) Render template using data from 1)
  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour
  });
});

exports.getSingupForm = (req, res) => {
  res.status(200).render('signup', {
    title: 'create your account!'
  });
};

exports.getLoginForm = (req, res) => {
  res
    .status(200)
    // .set(
    //   'Content-Security-Policy',
    //   "connect-src 'self' http://127.0.0.1:3000/ https://cdnjs.cloudflare.com"
    // )
    .render('login', {
      title: 'Log into your account'
    });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account'
  });
};

exports.getMyTours = catchAsync(async (req, res, next) => {
  // 1) Find all bookings
  const bookings = await Booking.find({ user: req.user.id });

  // 2) Find tours with the returned IDs
  const tourIDs = bookings.map(el => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIDs } });

  res.status(200).render('overview', {
    title: 'My Tours',
    tours
  });
});

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email
    },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser
  });
});

exports.getMyReviews = catchAsync(async (req, res) => {
  const reviews = await Review.find({ user: req.user._id }).populate({
    path: 'tour',
    select: 'name imageCover'
  });
  console.log(reviews);
  res.status(200).render('myReviews', {
    title: 'My Reviews',
    reviews
  });
});

exports.manage = resourceType =>
  catchAsync(async (req, res, next) => {
    let data;
    if (resourceType === 'user') {
      data = await User.find().select('+active');
    }
    if (resourceType === 'review') {
      data = await Review.find().populate({
        path: 'tour',
        select: `name`
      });
    }
    if (resourceType === 'booking') {
      data = await Booking.find().populate({
        path: 'user',
        select: 'name'
      });
    }
    res.status(200).render('manage', {
      title: `View ${resourceType[0].toUpperCase()}${resourceType.slice(1)}s`,
      resourceType,
      data
    });
  });

exports.edit = catchAsync(async (req, res, next) => {
  const userdata = await User.findOne({ _id: req.params.id }).select('+active');

  if (!userdata)
    next(
      new AppError(
        'User not found. It might have been deleted. Please refresh to get the current list of users.',
        404
      )
    );

  res.status(200).render('editUser', {
    title: 'Edit User',
    userdata
  });
});
