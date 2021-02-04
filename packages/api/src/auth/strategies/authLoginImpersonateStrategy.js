const passportJWT = require("passport-jwt");
const { jwtConfig } = require("~/config");

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const authImpersonateJwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: ExtractJWT.fromBodyField("token"),
    secretOrKey: jwtConfig.publicKey,
  },
  function (jwtPayload, cb) {
    return cb(null, jwtPayload.role === "admin");
  }
);

module.exports = authImpersonateJwtStrategy;
