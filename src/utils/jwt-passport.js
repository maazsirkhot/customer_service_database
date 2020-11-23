/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const pool = require('./dbConnection');
const queries = require('./queries');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'customerservice';

passport.use(
  new JwtStrategy(opts, async (jwtPayload, done) => {
    try {
      console.log(jwtPayload);
      if (jwtPayload.email) {
        const query =	jwtPayload.type === 'customer'
					  ? queries.SELECT.FINDCUSTOMERBYEMAIL
					  : queries.SELECT.FINDEMPLOYEEBYEMAIL;
        const result = await pool.promise().query(query, [jwtPayload.email]);

        if (!result) {
          return done(null, false);
        }
        return done(result, true);
      }
    } catch (error) {
      return done(error, false);
    }
    return done(null, false);
  }),
);
