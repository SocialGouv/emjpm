const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");

const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const knex = require("../db/knex");
const jwtConfig = require("../config/jwt");

const { User } = require("../model/User");

const init = require("./passport");

init();

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password"
    },
    function(username, password, done) {
      User.query()
        .where("username", username)
        .orWhere("email", username.toLowerCase().trim())
        .first()
        .eager("[roles, antennes, tis]")
        .then(function(user) {
          if (!user) {
            return done("Unknown user");
          }
          if (!user.active) {
            return done("User is inactive");
          }
          user.verifyPassword(password, function(err, passwordCorrect) {
            if (err) {
              return done(err);
            }
            if (!passwordCorrect) {
              return done("Invalid password");
            }
            return done(null, user);
          });
        })
        .catch(function(err) {
          done(err);
        });
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey:
        jwtConfig.publicKey ||
        /* eslint-disable no-console */
        console.log("WARN: no process.env.JWT_KEY defined") ||
        /* eslint-enable no-console */
        "emjpm-jwtkey"
    },
    function(jwtPayload, cb) {
      //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
      return knex("users")
        .where("id", parseInt(jwtPayload.id))
        .select()
        .then(user => {
          // in impersonate case
          if (jwtPayload.realUserId) {
            user.realUserId = jwtPayload.realUserId;
          }
          return cb(null, JSON.parse(JSON.stringify(user[0])));
        })
        .catch(err => {
          /* eslint-disable no-console */
          console.log("err");
          /* eslint-enable no-console */
          return cb(err);
        });
    }
  )
);

module.exports = passport;
