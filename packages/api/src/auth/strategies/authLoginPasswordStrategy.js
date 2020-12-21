const { Strategy: LocalStrategy } = require("passport-local");
const { User } = require("~/models");

const authLoginPasswordStrategy = new LocalStrategy(
  {
    passwordField: "password",
    usernameField: "username",
  },
  function (username, password, done) {
    User.query()
      .where("username", username)
      .orWhere("email", username.toLowerCase().trim())
      .first()
      .withGraphFetched("[roles, service, direction, mandataire]")
      .then(function (user) {
        if (!user) {
          return done("Unknown user");
        }

        if (!user.active) {
          return done("User is inactive");
        }

        user.verifyPassword(password, function (err, passwordCorrect) {
          if (err) {
            return done(err);
          }

          if (!passwordCorrect) {
            return done("Invalid password");
          }

          return done(null, user);
        });
      })
      .catch(function (err) {
        done(err);
      });
  }
);

module.exports = authLoginPasswordStrategy;
