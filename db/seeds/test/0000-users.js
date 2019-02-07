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
    active: true,
    prenom: "Adrien",
    email: "ud@ud.com"
  },
  {
    username: "kelly",
    password: "bryant123",
    type: "prepose",
    active: true,
    email: "panam@paris.com",
    prenom: "Julien"
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
    active: true,
    cabinet: "6D",
    email: "test2@ti.com"
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
    active: false,
    email: "panam2@paris.com",
    prenom: "Doug"
  },
  {
    id: 32,
    username: "titest",
    password: "titest",
    type: "ti",
    //reset_password_token: "LpWpzK4Jla9I87Aq",
    active: false,
    cabinet: "6D",
    email: "test@ti.com"
  },
  {
    id: 33,
    username: "tiToken",
    password: "tiToken",
    type: "ti",
    active: true,
    cabinet: "6D",
    reset_password_token: "LpWpzK4Jla9I87Aqtry",
    email: "test3@ti.com"
  },
  {
    id: 52,
    username: "ad",
    password: "ad123",
    type: "individuel",
    reset_password_token: "LpWpzK4Jla9I87Aq",
    active: true,
    email: "marcel@paris.com",
    prenom: "Marcel"
  }
];

exports.seed = (knex, Promise) =>
  knex("users")
    .del()
    .insert(USERS.map(getInsertData));
