const express = require('express');
const tourController = require('../controllers/tourController');

const router = express.Router();

// router.param('id', tourController.checkid);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.addTour);

router
  .route('/top-5-cheap')
  .get(tourController.aliasTop5, tourController.getAllTours);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
