const Review = require('../models/reviewModel');
const AppError = require('../utils/appError');

const catchAsync = require('../utils/catchAsync');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews
    }
  });
});

exports.addReview = catchAsync(async (req, res, next) => {
  if (!req.body.user) req.body.user = req.user._id;
  if (!req.body.tour) req.body.tour = req.params.tourId;

  const review = await Review.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      review
    }
  });
});
