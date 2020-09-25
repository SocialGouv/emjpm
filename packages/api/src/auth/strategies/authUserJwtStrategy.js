const passportJWT = require("passport-jwt");

const logger = require("../../utils/logger");
const knex = require("../../db/knex");
const jwtConfig = require("../../config/jwt");

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const secretOrKey = jwtConfig.publicKey || "emjpm-jwtkey";

function verify(jwtPayload, cb) {
  //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
  return knex("users")
    .where("id", parseInt(jwtPayload.id))
    .select()
    .then((users) => {
      const user = users[0];
      return cb(null, JSON.parse(JSON.stringify(user)));
    })
    .catch((err) => {
      logger.error(err);
      return cb(err);
    });
}

const authUserJwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: ExtractJWT.fromBodyField("access_token"),
    secretOrKey,
  },
  verify
);

const authUserJwtStrategyFromQuery = new JWTStrategy(
  {
    jwtFromRequest: ExtractJWT.fromUrlQueryParameter("access_token"),
    secretOrKey,
  },
  verify
);

module.exports = { authUserJwtStrategy, authUserJwtStrategyFromQuery };
