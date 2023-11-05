const express = require('express');
const multer = require('multer');

const restaurantAuthController = require('../controller/restaurantAuthController');
const userAuthController = require('../controller/userAuthController');
const foodController = require('../controller/foodController');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploads = multer({ storage: storage });
const router = express.Router();
// param middleware
// router.param('id', foodController.CheckID);

router
  .route('/')
  .get(foodController.getAllFoods)
  .post(restaurantAuthController.protect, foodController.createFood);

router
  .route('/:id')
  .get(foodController.getFood)
  .patch(foodController.updateFood)
  .delete(restaurantAuthController.protect, foodController.deleteFood);

module.exports = router;
