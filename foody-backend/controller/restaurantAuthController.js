const jwt = require('jsonwebtoken');

const { promisify } = require('util');

const AppError = require('../utils/appError');

const Restaurant = require('../model/restaurantModel');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = async (req, res, next) => {
  try {
    const newRestaurant = await Restaurant.create(req.body);
    const token = signToken(newRestaurant._id);
    res.status(201).json({
      status: 'success',
      token,
      data: {
        restaurant: newRestaurant,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
  next();
};

exports.login = async (req, res, next) => {
  try {
    const { name, password } = req.body;

    // Check name /password exists
    if (!name || !password)
      return next(
        new AppError('Please provide restuarant name and password', 400),
      );

    // Check if restaurant exists & password correct
    const restaurant = await Restaurant.findOne({ name })
      .select('+password')
      .populate('foods');

    // Check name /password exists
    if (
      !restaurant ||
      !(await restaurant.correctPassword(password, restaurant.password))
    )
      return next(new AppError('Incorrect restuarant name or password', 401));
    // If everything ok send token to client
    const token = signToken(restaurant._id);
    res.status(201).json({
      status: 'success',
      token,
      data: {
        restaurant,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
  next();
};

exports.protect = async (req, res, next) => {
  try {
    let token;
    // token exists?
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
      return next(
        new AppError('You are not logged in! Please login to get access', 401),
      );
    }
    // token valid?
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // user exists?

    const currentRestaurant = await Restaurant.findById(decoded.id);
    if (!currentRestaurant) {
      return next(
        new AppError(
          'The user belonging to this token does no longer exists',
          401,
        ),
      );
    }
    // Grant access to protected route
    req.restaurant = currentRestaurant;
    console.log(req.restaurant);

    next();
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'lead-guide']. role='user'
    if (!roles.includes(req.restaurant.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403),
      );
    }
    next();
  };
};
