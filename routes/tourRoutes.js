const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();

// router.param('id', tourController.checkid);

router.use('/:tourId/reviews', reviewRouter);

router
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.addTour);

router
  .route('/top-5-cheap')
  .get(tourController.aliasTop5, tourController.getAllTours);

router.route('/tour-stats').get(tourController.stats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

module.exports = router;
