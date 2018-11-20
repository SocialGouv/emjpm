const bcrypt = require("bcryptjs");

// when creating test user
const USER_DEFAULTS = {
  active: true
};

const getPasswordHash = clear => bcrypt.hashSync(clear, bcrypt.genSaltSync());

const getInsertData = ({ password, ...others }) => ({
  password: getPasswordHash(password),
  ...USER_DEFAULTS,
  ...others
});

const USERS = [
  {
    username: "jeremy",
    password: "johnson123",
    type: "individuel",
    active: true
  },
  {
    username: "kelly",
    password: "bryant123",
    type: "prepose",
    active: true
  },
  {
    username: "service1",
    password: "service1",
    type: "service",
    active: true
  },
  {
    username: "admin",
    password: "admin",
    type: "admin",
    active: true
  },
  {
    username: "ti1",
    password: "ti1",
    type: "ti",
    active: true
  },
  {
    username: "inactive",
    password: "inactive",
    type: "prepose",
    active: false
  },
  {
    username: "ti2",
    password: "ti2",
    type: "ti",
    active: false
  },
  {
    id: 42,
    username: "inactive2",
    password: "inactive2",
    type: "individuel",
    active: false
  },
  {
    id: 32,
    username: "titest",
    password: "titest",
    type: "ti",
    reset_password_token: "LpWpzK4Jla9I87Aq",
    active: false
  },
  {
    id: 52,
    username: "ad",
    password: "ad123",
    type: "individuel",
    reset_password_token: "LpWpzK4Jla9I87Aq",
    active: true
  }
];

exports.seed = (knex, Promise) =>
  knex("users")
    .del()
    .insert(USERS.map(getInsertData));
