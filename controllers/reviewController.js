const Review = require('../models/reviewModel');
const factory = require('./handlerFactory');
// const catchAsync = require('../utils/catchAsync');

exports.setTourUserId = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user._id;
  if (!req.body.tour) req.body.tour = req.params.tourId;
  next();
};

exports.getAllReviews = factory.getAll(Review);
exports.addReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
exports.getReview = factory.getOne(Review);
