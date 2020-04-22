const User = require('../models/User');
const jwt = require('jwt-simple');
const config = require('../config');

const token = user => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
};

exports.signup = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: 'You must provide email and password' });
  }

  User.findOne({ email }, (err, existingUser) => {
    if (err) {
      return next(err);
    }

    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    const newUser = new User({
      email,
      password
    });

    newUser.save(err => {
      if (err) {
        return next(err);
      }

      res.json({ token: token(newUser) });
    });
  });
};

exports.signin = (req, res, next) => {
  res.send({ token: token(req.user) });
};
