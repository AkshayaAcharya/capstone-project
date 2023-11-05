const Food = require('../model/foodModel');
const Restaurant = require('../model/restaurantModel');
// get all foods
exports.getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find().populate('restaurant');
    console.log(foods);
    res.status(200).json({
      status: 'success',
      results: foods.length,
      data: {
        foods,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err,
    });
  }
};
// create a food
exports.createFood = async (req, res) => {
  try {
    const restId = req.body.restaurant;
    const newFood = await Food.create(req.body);
    const ab = await Restaurant.findByIdAndUpdate(restId, {
      $push: { foods: newFood._id.toString() },
    });
    await Food.find().populate('restaurant');
    // ab.foods.push(newFood._id.toString());
    console.log(ab);
    await Restaurant.find().populate('foods');
    res.status(201).json({
      status: 'success',
      data: {
        food: newFood,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
//  get food
exports.getFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        food,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err,
    });
  }
};

// update food
exports.updateFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: { food },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err,
    });
  }
};
// delete a food
exports.deleteFood = async (req, res) => {
  try {
    await Restaurant.findOneAndUpdate(
      { foods: req.params.id },
      { $pull: { foods: req.params.id } },
    );
    await Food.findOneAndDelete({ _id: req.params.id });
    // res.json(deletedInstance);
    // await Restaurant.findByIdAndDelete({ foods: req.params.id });
    // await Food.findByIdAndDelete(req.params.id);
    // await Restaurant.remove({ foods: { _id: req.params.id } });
    // await Food.remove({ restaurant: { _id: req.params.id } });
    // await Restaurant.findOneAndDelete({ $pull: { foods: req.params.id } });
    // await Restaurant.findOneAndUpdate(
    //   { _id: res.id._id },
    //   { $pull: { posts: req.params.postId } },
    //   // You don't need an error callback here since you are
    //   // using async/await. Handle the error in the catch block.
    // );
    // await Posts.remove({ _id: req.params.postId });
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Not deleted',
    });
  }
};
