const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../model/userModel');
const AppError = require('../utils/appError');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);

    const token = signToken(newUser._id);
    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newUser,
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
    const { email, password } = req.body;

    // Check email /password exists
    if (!email || !password)
      return next(new AppError('Please provide email and password', 400));

    // Check if user exists & password correct
    const user = await User.findOne({ email }).select('+password');

    // Check email /password exists
    if (!user || !(await user.correctPassword(password, user.password)))
      return next(new AppError('Incorrect email or password', 401));

    // If everything ok send token to client
    const token = signToken(user._id);
    res.status(201).json({
      status: 'success',
      token,
      data: {
        user,
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

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError(
          'The user belonging to this token does no longer exists',
          401,
        ),
      );
    }
    // Grant access to protected route
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
  next();
};
