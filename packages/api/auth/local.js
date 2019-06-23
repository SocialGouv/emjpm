const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const { Strategy: BearerStrategy } = require("passport-http-bearer");

const init = require("./passport");
const knex = require("../db/knex");
const authHelpers = require("./_helpers");

const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const options = {};

init();

passport.use(
  new LocalStrategy(options, (username, password, done) => {
    // check to see if the username exists
    knex("users")
      .where("username", "ilike", username.trim())
      .orWhere("email", "ilike", username.trim())
      .first()
      .then(user => {
        if (!user) return done(null, false);
        if (!user.active) return done(null, false);
        if (!authHelpers.comparePass(password, user.password)) {
          return done(null, false);
        } else {
          return done(null, user);
        }
      })
      .catch(err => {
        return done(err);
      });
  })
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey:
        process.env.JWT_KEY ||
        console.log("WARN: no process.env.JWT_KEY defined") ||
        "emjpm-jwtkey"
    },
    function(jwtPayload, cb) {
      //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
      knex("users")
        .where("id", parseInt(jwtPayload.id))
        .select()
        .then(user => {
          return cb(null, JSON.parse(JSON.stringify(user[0])));
        })
        .catch(err => {
          console.log("err");
          return cb(err);
        });
    }
  )
);

passport.use(
  new BearerStrategy(function(token, done) {
    knex("users")
      .where("token", token)
      .first()
      .eager("roles")
      .then(function(user) {
        if (!user) {
          return done("Invalid Token");
        }
        if (!user.active) {
          return done("User is inactive");
        }
        return done(null, user);
      })
      .catch(function(err) {
        done(err);
      });
  })
);

module.exports = passport;
