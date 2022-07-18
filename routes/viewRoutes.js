const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(viewsController.alerts);

router.get('/', authController.isLoggedIn, (req, res) => {
  const url = `${req.protocol}://${req.get('host')}/`;
  res.render('index', {
    url
  });
});
router.get('/tours', authController.isLoggedIn, viewsController.getOverview);
router.get('/tour/:slug', authController.isLoggedIn, viewsController.getTour);
router.get('/signup', authController.isLoggedIn, viewsController.getSingupForm);
router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);

router.get('/me', authController.protect, viewsController.getAccount);
router.get('/my-tours', authController.protect, viewsController.getMyTours);
router.get('/my-reviews', authController.protect, viewsController.getMyReviews);

router.post(
  '/submit-user-data',
  authController.protect,
  viewsController.updateUserData
);

router.get(
  '/manage-users',
  authController.protect,
  authController.restrictTo('admin'),
  viewsController.manage('user')
);
router.get(
  '/manage-reviews',
  authController.protect,
  authController.restrictTo('admin'),
  viewsController.manage('review')
);
router.get(
  '/manage-bookings',
  authController.protect,
  authController.restrictTo('admin'),
  viewsController.manage('booking')
);
router.get(
  '/edit/:id',
  authController.protect,
  authController.restrictTo('admin'),
  viewsController.edit
);

module.exports = router;
