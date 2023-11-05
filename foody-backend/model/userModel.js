const mongoose = require('mongoose');

const validator = require('validator');

const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Must have email id'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid mail'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
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
  mobileNumber: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cart' }],
});

userSchema.pre('save', async function (next) {
  // run this only if password modified
  if (!this.isModified('password')) {
    return next();
  }
  // Hash the password : encrypt password using bcryptjs
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
});

// schema instance method
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
const User = mongoose.model('User', userSchema);

module.exports = User;
