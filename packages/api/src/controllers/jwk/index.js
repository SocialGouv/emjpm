const rasha = require("rasha");
const { jwtConfig } = require("~/config");

/**
 * Sends the JWT key set
 */

exports.getJwks = async (req, res) => {
  const jwk = {
    ...rasha.importSync({ pem: jwtConfig.publicKey }),
    alg: "RS256",
    kid: jwtConfig.publicKey,
    use: "sig",
  };
  const jwks = {
    keys: [jwk],
  };
  res.setHeader("Content-Type", "application/json");
  return res.status(200).json(jwks);
};
