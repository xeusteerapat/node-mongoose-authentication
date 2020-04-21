const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

// Define user model
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: String
});

// Before newUser get save
userSchema.pre('save', function (next) {
  const newUser = this;

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }

      newUser.password = hash;
      next();
    });
  });
});

// Create the model class
const ModelClass = mongoose.model('User', userSchema);

module.exports = ModelClass;
