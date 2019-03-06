const bcrypt = require("bcryptjs");
const createError = require("http-errors");

const knex = require("../db/knex");

function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

function createUser(req, res) {
  return handleErrors(req)
    .then(() => {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(req.body.password, salt);
      return knex("users")
        .insert({
          username: req.body.username,
          password: hash
        })
        .returning("*");
    })
    .catch(err => {
      res.status(400).json({ status: err.message });
    });
}

function loginRequired(req, res, next) {
  if (!req.user) return res.status(401).json({ status: "Please log in" });
  return next();
}

const typeRequired = (...userTypes) => (req, res, next) => {
  //console.log(req.user);
  try {
    if (!req.user) {
      throw createError.Unauthorized(`Please log in`);
    }
    if (userTypes.find(userType => req.user.type === userType)) {
      return next();
    }
    throw createError.Unauthorized(`Please log in`);
  } catch (err) {
    next(err);
  }
};

function adminRequired(req, res, next) {
  try {
    if (!req.user) {
      throw createError.Unauthorized(`Please log in`);
    }
    return knex("users")
      .where({ username: req.user.username })
      .first()
      .then(user => {
        if (!user.admin) {
          throw createError.Unauthorized(`Please log in`);
        }
        return next();
      });
  } catch (err) {
    next(err);
  }
}

function mandataireRequired(req, res, next) {
  try {
    if (!req.user) {
      throw createError.Unauthorized(`Please log in`);
    }
    return knex("users")
      .where({ username: req.user.username })
      .first()
      .then(user => {
        if (!user.mandataire) {
          throw createError.Unauthorized(`You are not authorized`);
        }
        return next();
      });
  } catch (err) {
    next(err);
  }
}

function loginRedirect(req, res, next) {
  // if (req.user) return res.status(200).json({ status: "You are already logged in" });
  return next();
}

function handleErrors(req) {
  return new Promise((resolve, reject) => {
    if (req.body.username.length < 6) {
      reject({
        message: "Username must be longer than 6 characters"
      });
    } else if (req.body.password.length < 6) {
      reject({
        message: "Password must be longer than 6 characters"
      });
    } else {
      resolve();
    }
  });
}

module.exports = {
  comparePass,
  createUser,
  typeRequired,
  mandataireRequired,
  loginRequired,
  adminRequired,
  loginRedirect
};
