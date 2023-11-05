const express = require('express');

const restaurantController = require('../controller/restaurantConroller');

const restaurantAuthController = require('../controller/restaurantAuthController');

const router = express.Router();
// param middleware
// router.param("id", restaurantController.CheckID);
// ROUTES: RESTAURANTS
// router
//   .route('/top-5-best')
//   .get(
//     restaurantController.aliasTopRestaurants,
//     restaurantController.getAllRestaurants,
//   );

// router
//   .route('/restaurant-stats')
//   .get(restaurantController, restaurantController.getRestaurantStats);

// signup
router.post('/signup', restaurantAuthController.signup);

// login
router.post('/login', restaurantAuthController.login);

router
  .route('/')
  .get(restaurantController.getAllRestaurants)
  .post(restaurantController.createRestaurant);
// .get(userAuthController.protect, restaurantController.getAllRestaurants)
// .post(restaurantController.checkBody, restaurantController.createRestaurant);
router
  .route('/:id')
  .get(restaurantController.getRestaurant)
  .patch(restaurantController.updateRestaurant)
  .delete(restaurantController.deleteRestaurant);

module.exports = router;
