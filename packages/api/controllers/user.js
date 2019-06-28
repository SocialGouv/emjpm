const passport = require("../auth/local");
const rasha = require("rasha");
const jwtConfig = require("../config/jwt");
const { validationResult } = require("express-validator");

/**
 * Sends the JWT key set
 */
exports.getJwks = async (req, res) => {
  const jwk = {
    ...rasha.importSync({ pem: jwtConfig.publicKey }),
    alg: "RS256",
    use: "sig",
    kid: jwtConfig.publicKey
  };
  const jwks = {
    keys: [jwk]
  };
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(jwks, null, 2) + "\n");
  handleResponse(res, 200, jwks);
};

/**
 * Sign in using username and password and returns JWT
 */
exports.postLogin = async (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  passport.authenticate("local", (err, user) => {
    if (err) {
      return handleResponse(res, 400, { error: err });
    }
    if (user) {
      handleResponse(res, 200, user.getUser());
    }
  })(req, res, next);
};

// Webhook can be used with hasura
exports.getWebhook = async (req, res, next) => {
  passport.authenticate("bearer", (err, user) => {
    if (err) {
      return handleResponse(res, 401, { error: err });
    }
    if (user) {
      handleResponse(res, 200, user.getHasuraClaims());
    } else {
      handleResponse(res, 200, { "X-Hasura-Role": "anonymous" });
    }
  })(req, res, next);
};

function handleResponse(res, code, statusMsg) {
  res.status(code).json(statusMsg);
}
