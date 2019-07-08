const passport = require("../auth/local");
const rasha = require("rasha");

const jwtConfig = require("../config/jwt");
const { validationResult } = require("express-validator");
const { User } = require("../db/schema");
const { updateLastLogin } = require("../db/queries/users");
const { addDataLogs } = require("../db/queries/logsData");
const { errorHandler } = require("../db/errors");

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

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors });
  }

  passport.authenticate("local", (err, user) => {
    if (err) {
      return handleResponse(res, 400, { errors: errors.array() });
    }
    if (user) {
      updateLastLogin(user.id).then(() => {
        addDataLogs({
          user_id: user.id,
          action: "connexion",
          result: "success"
        });
        handleResponse(res, 200, user.getUser());
      });
    }
  })(req, res, next);
};

/**
 * POST /signup
 * Create a new local account
 */
exports.postSignup = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors });
  }

  try {
    // eslint-disable-next-line
    const user = await User.query()
      .allowInsert("[username, password]")
      .insert({
        username: req.body.username,
        password: req.body.password,
        role: req.body.password,
        nom: req.body.password,
        prenom: req.body.password,
        email: req.body.password
      });

    return res.json({ success: true });
  } catch (err) {
    errorHandler(err, res);
    return;
  }
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
