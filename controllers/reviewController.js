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
  const review = {
    ...req.body
  };

  review.user = req.user._id;

  const savedReview = await Review.create(review);

  res.status(200).json({
    status: 'success',
    data: {
      review: savedReview
    }
  });
});
