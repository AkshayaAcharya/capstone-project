const express = require('express');

const userAuthController = require('../controller/userAuthController');
const cartController = require('../controller/cartController');

const router = express.Router();
// param middleware
// router.param('id', foodController.CheckID);

router
  .route('/')
  .get(userAuthController.protect, cartController.getCartData)
  .post(userAuthController.protect, cartController.addCart);

router
  .route('/:id')
  .delete(userAuthController.protect, cartController.deleteCart);

// router
//   .route('/:id')
//   .get(cartController.getFood)
//   .patch(cartController.updateFood)
//   .delete(userAuthController.protect, cartController.deleteFood);

module.exports = router;
