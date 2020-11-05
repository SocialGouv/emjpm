var fs = require("fs");
var path = require("path");
var fnv = require("fnv-plus");

// TODO: why does rsaPemToJwk work with a file but not with a variable?
// WARNING: .pem files are here for exemple don't use them in production
exports.key = (
  process.env.AUTH_PRIVATE_KEY ||
  fs.readFileSync(path.join(__dirname, "./private.pem")).toString()
).replace(/\\n/g, "\n");

exports.publicKey = (
  process.env.AUTH_PUBLIC_KEY ||
  fs.readFileSync(path.join(__dirname, "./public.pem")).toString()
).replace(/\\n/g, "\n");

// Key Identifier – Acts as an ‘alias’ for the key
exports.kid = process.env.AUTH_KEY_ID || fnv.hash(this.publicKey, 128).hex();
