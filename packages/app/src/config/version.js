let version;
version = require("../../package.json").version;
if (version === "0.0.0") {
  version = require("~/lerna.ci.json").version;
}
export default version;
