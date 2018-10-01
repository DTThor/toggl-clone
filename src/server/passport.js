const { Strategy: JwtStrategy } = require('passport-jwt');
const User = require('./models/user');

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use(new JwtStrategy({
    jwtFromRequest: req =>
      req.body.token || req.query.token || req.headers['x-access-token'],
    secretOrKey: 'secret',
  }, (jwtPayload, done) => {
    User.findOne({ where: { email: jwtPayload.email } })
      .then((user) => { done(null, user); });
  }));
};
