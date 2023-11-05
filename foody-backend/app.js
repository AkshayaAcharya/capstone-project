const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const restaurantRouter = require('./routes/restaurantRoutes');

const userRouter = require('./routes/userRoutes');

const foodRouter = require('./routes/foodRoutes');

const cartRouter = require('./routes/cartRoutes');

const multer = require('multer');

const app = express();
app.use(cors());

// MIDDLEWARES
// middleware to handle request data: middlewares are the one which can modify the incoming data
// middleware to modify the request
// this below middleware is applied on every single request

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
// app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
  console.log('Hello from the middleware!');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use(express.static('public/uploads'));

// ROUTE HANDLERS: RESTAURANTS
app.use('/api/v1/restaurants', restaurantRouter);
// ROUTE HANDLERS: USERS
app.use('/api/v1/users', userRouter);
// ROUTE HANDLERS: FOODS
app.use('/api/v1/foods', foodRouter);
// ROUTE HANDLERS: CARTS
app.use('/api/v1/carts', cartRouter);

module.exports = app;
