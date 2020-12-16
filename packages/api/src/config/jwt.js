const fs = require("fs");
const path = require("path");
const fnv = require("fnv-plus");

module.exports = (env) => {
  let {
    AUTH_PRIVATE_KEY,
    AUTH_PRIVATE_KEY_FILE,
    AUTH_PUBLIC_KEY,
    AUTH_PUBLIC_KEY_FILE,
  } = env;

  // dev (yarn test) and CI
  if (!(AUTH_PRIVATE_KEY || AUTH_PRIVATE_KEY_FILE)) {
    AUTH_PRIVATE_KEY_FILE = path.join(
      __dirname,
      "../../../../.dev-secrets/private.pem"
    );
  }
  if (!(AUTH_PUBLIC_KEY || AUTH_PUBLIC_KEY_FILE)) {
    AUTH_PUBLIC_KEY_FILE = path.join(
      __dirname,
      "../../../../.dev-secrets/public.pem"
    );
  }

  if (AUTH_PRIVATE_KEY_FILE) {
    AUTH_PRIVATE_KEY = fs.readFileSync(AUTH_PRIVATE_KEY_FILE).toString();
  }
  if (AUTH_PUBLIC_KEY_FILE) {
    AUTH_PUBLIC_KEY = fs.readFileSync(AUTH_PUBLIC_KEY_FILE).toString();
  }

  const key = AUTH_PRIVATE_KEY.replace(/\\n/g, "\n");
  const publicKey = AUTH_PUBLIC_KEY.replace(/\\n/g, "\n");

  // Key Identifier – Acts as an ‘alias’ for the key
  const kid = env.AUTH_KEY_ID || fnv.hash(publicKey, 128).hex();

  return {
    key,
    kid,
    publicKey,
  };
};
