const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const jwtDecode = require("jwt-decode");
const passportJWT = require("passport-jwt");
const passportBearer = require("passport-http-bearer");

const logger = require("../utils/logger");
const knex = require("../db/knex");
const jwtConfig = require("../config/jwt");
const { AccessToken } = require("../models/AccessToken");
const { User } = require("../models/User");
const init = require("./passport");

const JWTStrategy = passportJWT.Strategy;
const BearerStrategy = passportBearer.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

if (!jwtConfig.publicKey) {
  logger.error("Invalid jwtConfig.publicKey, check process.env.JWT_KEY");
}

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
        .eager("[roles, service, tis]")
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
  new BearerStrategy(async function(token, done) {
    try {
      const decoded = jwtDecode(token);

      const accessToken = decoded.uid;
      const userId = decoded.userId;
      const editorId = decoded.editorId;
      try {
        const currentClient = await AccessToken.query()
          .where("access_token", accessToken)
          .first();
        if (
          currentClient.user_id === userId &&
          currentClient.editor_id === parseInt(editorId)
        ) {
          return done(null, currentClient, { scope: "all" });
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(null, false);
      }
    } catch (error) {
      return done(null, false);
    }
  })
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.publicKey || "emjpm-jwtkey"
    },
    function(jwtPayload, cb) {
      //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
      return knex("users")
        .where("id", parseInt(jwtPayload.id))
        .select()
        .then(users => {
          const user = users[0];
          return cb(null, JSON.parse(JSON.stringify(user)));
        })
        .catch(err => {
          logger.error(err);
          return cb(err);
        });
    }
  )
);

module.exports = passport;
