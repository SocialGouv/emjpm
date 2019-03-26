const bcrypt = require("bcryptjs");

// when creating test user
const USER_DEFAULTS = {
  active: true
};

const getPasswordHash = clear => bcrypt.hashSync(clear, bcrypt.genSaltSync());

const getInsertData = (knex, { password, ...others }) => ({
  password: getPasswordHash(password),
  ...(others.reset_password_token
    ? { reset_password_expires: knex.raw(`now() + interval '5 minute'`) }
    : {}),
  ...USER_DEFAULTS,
  ...others
});

const USERS = [
  {
    username: "jeremy",
    password: "johnson123",
    type: "individuel",
    prenom: "Adrien",
    email: "ud@ud.com"
  },
  {
    username: "kelly",
    password: "bryant123",
    type: "prepose",
    email: "panam@paris.com",
    prenom: "Julien"
  },
  {
    username: "service1",
    password: "service1",
    type: "service",
    email: "melanie@paris.com",
    prenom: "Mélanie"
  },
  {
    username: "admin",
    password: "admin",
    type: "admin"
  },
  {
    username: "ti1",
    password: "ti1",
    type: "ti",
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
    email: "marcel@paris.com",
    prenom: "Marcel"
  }
];

exports.seed = knex =>
  knex("users")
    .del()
    .insert(USERS.map(user => getInsertData(knex, user)));
