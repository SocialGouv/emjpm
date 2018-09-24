const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

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
      .where({ username })
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
      secretOrKey: "your_local_key"
    },
    function(jwtPayload, cb) {
      console.log(
        "jwtPayload",
        knex("users").where("id", parseInt(jwtPayload.id))
      );
      //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
      return knex("users")
        .where("id", parseInt(jwtPayload.id)).select()
        .then(user => {
          return cb(null, JSON.parse(JSON.stringify(user[0])));
        })
        .catch(err => {
            console.log("err")
          return cb(err);
        });
    }
  )
);

module.exports = passport;
