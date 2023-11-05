const Food = require('../model/foodModel');
const Restaurant = require('../model/restaurantModel');
const APIFeatures = require('../utils/apiFeatures');
// top restaurants
exports.aliasTopRestaurants = (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,address';
  next();
};

// get all restaurants
exports.getAllRestaurants = async (req, res) => {
  try {
    // EXECUTE QUERY
    const features = new APIFeatures(
      Restaurant.find().populate('foods'),
      req.query,
    )
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const restaurants = await features.query;
    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: restaurants.length,
      data: {
        restaurants,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err,
    });
  }
};

// get single restaurant
exports.getRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        restaurant,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err,
    });
  }
};

// create a restaurant
exports.createRestaurant = async (req, res) => {
  try {
    const newRestaurant = await Restaurant.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        restaurant: newRestaurant,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent',
    });
  }
};

// update a restaurant
exports.updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    res.status(200).json({
      status: 'success',
      data: { restaurant },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err,
    });
  }
};

// delete restaurant
exports.deleteRestaurant = async (req, res) => {
  try {
    await Restaurant.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

// exports.getRestaurantStats = async (req, res) => {
//   try {
//     const stats = await Restaurant.aggregate([
//       {
//         $match: {
//           ratingsAverage: { $gte: 4.5 },
//         },
//       },
//       {
//         $group: {
//           _id: 'easy',
//           numRestaurants: { $sum: 1 },
//           numRatings: { $sum: '$ratingQunatity' },
//           avgRating: { $avg: '$ratingsAverage' },
//           avgPrice: {
//             $avg: '$price',
//           },
//           minPrice: {
//             $avg: '$price',
//           },
//           maxPrice: {
//             $avg: '$price',
//           },
//         },
//       },
//       {
//         $sort: { avgPrice: 1 },
//       },
//     ]);
//     res.status(204).json({
//       status: 'success',
//       data: {
//         stats,
//       },
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: 'fail',
//       message: err,
//     });
//   }
// };
