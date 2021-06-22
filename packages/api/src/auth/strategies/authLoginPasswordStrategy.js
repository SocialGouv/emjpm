const { Strategy: LocalStrategy } = require("passport-local");
const { User } = require("~/models");

const authLoginPasswordStrategy = new LocalStrategy(
  {
    passwordField: "password",
    usernameField: "email",
  },
  function (email, password, done) {
    User.query()
      .where("email", email.toLowerCase().trim())
      .first()
      .withGraphFetched("[roles, service, direction, mandataire]")
      .then(function (user) {
        if (!user) {
          return done("Unknown user");
        }

        if (!user.active && user.type !== "admin") {
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
