const passport = require("../auth/local");
// const { errorHandler } = require("../db/errors");
const rasha = require("rasha");
const jwtConfig = require("../config/jwt");
const jwt = require("jsonwebtoken");

const { updateLastLogin } = require("../db/queries/users");
const { addDataLogs } = require("../db/queries/logsData");

// TODO: Should be in a separate file
const redirs = {
  individuel: "/mandataires",
  prepose: "/mandataires",
  service: "/services",
  ti: "/tis",
  admin: "/admin",
  default: "/"
};

const getHasuraClaims = id => {
  return {
    "x-hasura-allowed-roles": ["user", "admin"],
    "x-hasura-default-role": "user",
    "x-hasura-user-id": `${id}`
    // 'x-hasura-org-id': '123',
    // 'x-hasura-custom': 'custom-value'
  };
};

const getJwt = (id, username) => {
  const signOptions = {
    subject: id.toString(),
    expiresIn: "30d", // 30 days validity
    algorithm: "RS256"
  };
  const claim = {
    name: username,
    // iat: Math.floor(Date.now() / 1000),
    "https://hasura.io/jwt/claims": getHasuraClaims(id)
  };
  return jwt.sign(claim, jwtConfig.key, signOptions);
};

/**
 * Sends the JWT key set
 */
exports.getJwks = async (req, res, next) => {
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
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      if (process.env.NODE_ENV !== "test") {
        console.log(`Unauthorized user : ${req.body.username}`);
      }
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }
    if (user) {
      req.logIn(user, { session: false }, function(err) {
        if (err) {
          return next(err);
        }

        updateLastLogin(user.id)
          .then(() =>
            addDataLogs({
              user_id: user.id,
              action: "connexion",
              result: "success"
            })
          )
          .then(() => {
            return res.status(200).json({
              success: true,
              url: redirs[user.type] || redirs.default,
              token: getJwt(user.id, user.username)
            });
          })
          .catch(e => {
            addDataLogs({
              user_id: user.id,
              action: "connexion",
              result: "fail"
            });
            return console.log(e);
          });
      });
    }
  })(req, res, next);
};

// Webhook can be used with hasura
exports.getWebhook = async (req, res, next) => {
  passport.authenticate("bearer", (err, user, info) => {
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
