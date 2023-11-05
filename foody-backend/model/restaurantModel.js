const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Food = require('./foodModel');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A restaurant must have a name'],
    unique: true,
    maxlength: [40, 'Must be within 40'],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm a password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same',
    },
  },
  address: {
    type: String,
    required: true,
  },
  openTime: {
    type: String,
    required: true,
  },
  closeTime: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    trime: true,
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [false, 'A restaurant must have cover image'],
  },
  images: [String],
  createdAt: { type: Date, default: Date.now(), select: false },
  role: {
    type: String,
    enum: ['user', 'owner', 'admin'],
    default: 'owner',
  },
  foods: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Food' }],
});

restaurantSchema.pre('save', async function (next) {
  // run this only if password modified
  if (!this.isModified('password')) {
    return next();
  }
  // Hash the password : encrypt password using bcryptjs
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
});

// schema instance method
restaurantSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
