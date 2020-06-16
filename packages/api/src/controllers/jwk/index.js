const rasha = require("rasha");
const jwtConfig = require("../../config/jwt");

/**
 * Sends the JWT key set
 */

exports.getJwks = async (req, res) => {
  const jwk = {
    ...rasha.importSync({ pem: jwtConfig.publicKey }),
    alg: "RS256",
    use: "sig",
    kid: jwtConfig.publicKey,
  };
  const jwks = {
    keys: [jwk],
  };
  res.setHeader("Content-Type", "application/json");
  return res.status(200).json(jwks);
};
