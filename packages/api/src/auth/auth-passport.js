const passport = require("passport");
const authLoginPasswordStrategy = require("./strategies/authLoginPasswordStrategy");
const authEditorJwtStrategy = require("./strategies/authEditorJwtStrategy");
const authUserJwtStrategy = require("./strategies/authUserJwtStrategy");
const {
  strategy: authHasuraWebHookHeaderSecretStrategy,
  userSerializer: authHasuraUserSerializer,
} = require("./strategies/authHasuraWebHookHeaderSecretStrategy");

const logger = require("~/utils/logger");
const { jwtConfig } = require("~/config");

const knex = require("~/db/knex");

if (!jwtConfig.publicKey) {
  logger.error("Invalid jwtConfig.publicKey, check process.env.JWT_KEY");
}

function init() {
  passport.serializeUser((user, done) => {
    if (user && user.id) {
      done(null, user.id);
    } else if (user.__auth_type__ === "hasura") {
      // hasura webhook strategy
      done(null, authHasuraUserSerializer.serialize(user));
    } else {
      // unknown
      done(new Error("Invalid user"));
    }
  });

  passport.deserializeUser((str, done) => {
    if (str.startsWith(authHasuraUserSerializer.PREFIX)) {
      done(null, authHasuraUserSerializer.deserialize(str));
    }
    const id = str;
    knex("users")
      .where({ id })
      .first()
      .then((user) => {
        done(null, user);
      })
      .catch((err) => {
        logger.error(err);
        done(err, null);
      });
  });
}
init();

passport.use("login-password", authLoginPasswordStrategy);
passport.use("editor-jwt", authEditorJwtStrategy);
passport.use("user-jwt", authUserJwtStrategy);
passport.use(
  "hasura-webhook-header-secret",
  authHasuraWebHookHeaderSecretStrategy
);

module.exports = passport;
