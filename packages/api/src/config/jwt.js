var fs = require("fs");
var fnv = require("fnv-plus");

const { env } = process;
if (env.AUTH_PRIVATE_KEY_FILE) {
  env.AUTH_PRIVATE_KEY = fs.readFileSync(env.AUTH_PRIVATE_KEY_FILE).toString();
}
if (env.AUTH_PUBLIC_KEY_FILE) {
  env.AUTH_PUBLIC_KEY = fs.readFileSync(env.AUTH_PUBLIC_KEY_FILE).toString();
}

exports.key = env.AUTH_PRIVATE_KEY.replace(/\\n/g, "\n");

exports.publicKey = env.AUTH_PUBLIC_KEY.replace(/\\n/g, "\n");

// Key Identifier – Acts as an ‘alias’ for the key
exports.kid = env.AUTH_KEY_ID || fnv.hash(this.publicKey, 128).hex();
