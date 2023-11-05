const Food = require('../model/foodModel');
const Cart = require('../model/cartModel');
const User = require('../model/userModel');
// get all foods
exports.getCartData = async (req, res) => {
  try {
    const carts = await Cart.find().populate('user');
    res.status(200).json({
      status: 'success',
      results: carts.length,
      data: {
        carts,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err,
    });
  }
};
// add to cart
exports.addCart = async (req, res) => {
  try {
    const foodId = req.body.food;
    const userId = req.body.user;
    const newCart = await Cart.create(req.body);
    await User.findByIdAndUpdate(userId, {
      $push: { cart: newCart._id.toString() },
    });
    await Cart.find().populate('food');
    await Cart.find().populate('user');
    res.status(201).json({
      status: 'success',
      data: {
        cart: newCart,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

// delete a food
exports.deleteCart = async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { cart: req.params.id },
      { $pull: { cart: req.params.id } },
    );
    await Food.findOneAndUpdate(
      { cart: req.params.id },
      { $pull: { cart: req.params.id } },
    );
    await Cart.findOneAndDelete({ _id: req.params.id });
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
