let version;
try {
  version = require("~/lerna.ci.json").version;
} catch (e) {
  version = require("../../package.json").version;
}
export default version;
