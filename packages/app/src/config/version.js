let version;
version = require("../../package.json").version;
if (version === "0.0.0") {
  version = require("~/config/lerna.ci.json").version;
}
export default version;
