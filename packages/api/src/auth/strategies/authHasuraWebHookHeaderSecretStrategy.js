const passportCustom = require("passport-custom");

const CustomStrategy = passportCustom.Strategy;

// http://www.passportjs.org/packages/passport-trusted-header/
const authHasuraWebHookHeaderSecretStrategy = new CustomStrategy(function(
  req,
  done
) {
  const secret = req.headers["hasura_web_hook_secret"];

  if (secret === process.env["HASURA_WEB_HOOK_SECRET"]) {
    // continue
    return done(undefined, {
      hasura: true
    });
  } else {
    // error
    return done(undefined, false);
  }
});

module.exports = authHasuraWebHookHeaderSecretStrategy;
