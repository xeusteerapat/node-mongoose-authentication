const auth = require('../controllers/auth');
const passport = require('passport');
const passportService = require('../services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function (app) {
  app.get('/', requireAuth, (req, res) => {
    res.send({ hi: 'there' });
  });
  app.post('/signup', auth.signup);
  app.post('/signin', requireSignin, auth.signin);
};
