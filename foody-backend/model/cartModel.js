const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A food must have a name'],
    unique: false,
  },
  quantity: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  food: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Food' }],
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
