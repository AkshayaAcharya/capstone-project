const express = require('express');

const userController = require('../controller/userController');

const userAuthController = require('../controller/userAuthController');

const router = express.Router();

// signup
router.post('/signup', userAuthController.signup);
// login
router.post('/login', userAuthController.login);

// USERS
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);
module.exports = router;
