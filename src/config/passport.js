const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/config');

module.exports = function(passport){
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = config.passport.secret;
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => 
  {

    User.getUserByEmail(jwt_payload.data.email, (err, user) => 
    {
      if(err)
      {
        return done(err, false);
      }

      if(user)
      {
        return done(null, user);
      } else 
      {
        return done(null, false);
      }
    });
  }));
}
