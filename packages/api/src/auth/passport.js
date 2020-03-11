const passport = require("passport");

const logger = require("../utils/logger");
const knex = require("../db/knex");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    knex("users")
      .where({ id })
      .first()
      .then(user => {
        done(null, user);
      })
      .catch(err => {
        logger.error(err);
        done(err, null);
      });
  });
};
