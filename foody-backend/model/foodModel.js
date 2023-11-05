const mongoose = require('mongoose');

const Restaurant = require('./restaurantModel');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A food must have a name'],
    unique: false,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  // picture: {
  //   type: String,
  //   required: [true, 'A food must have cover image'],
  // },
  restaurant: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }],
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
