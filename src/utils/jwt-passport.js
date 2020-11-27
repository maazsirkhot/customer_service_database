/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const pool = require('./dbConnection');
const queries = require('./queries');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'customerservice';

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, async (jwtPayload, done) => {
      try {
        if (jwtPayload.email) {
          const query =	jwtPayload.type === 'customer'
            ? queries.SELECT.FINDCUSTOMERBYEMAIL
            : queries.SELECT.FINDEMPLOYEEBYEMAIL;
          const result = await pool.promise().query(query, [jwtPayload.email]);
          if (!result[0][0]) {
            return done(null, false);
          }
          result[0][0].type = jwtPayload.type;
          return done(null, result[0][0]);
        }
      } catch (error) {
        return done(error, false);
      }
      return done(null, false);
    }),
  );
};
