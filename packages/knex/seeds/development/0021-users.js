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
    email: "ud@ud.com",
    password: "johnson123",
    prenom: "Adrien",
    type: "individuel",
    username: "jeremy"
  },
  {
    email: "panam@paris.com",
    password: "bryant123",
    prenom: "Julien",
    type: "prepose",
    username: "kelly"
  },
  {
    active: true,
    email: "melanie@paris.com",
    password: "service1",
    prenom: "Mélanie",
    type: "service",
    username: "service1"
  },
  {
    email: "admin@admin.com",
    password: "admin",
    prenom: "Dark Vador",
    type: "admin",
    username: "admin"
  },
  {
    cabinet: "6D",
    email: "test2@ti.com",
    password: "ti1",
    prenom: "Pierre",
    type: "ti",
    username: "ti1"
  },
  {
    username: "inactive",
    password: "inactive",
    prenom: "Paul",
    type: "prepose",
    active: false
  },
  {
    username: "ti2",
    prenom: "Jack",
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
    email: "test@ti.com",
    prenom: "Jean"
  },
  {
    id: 33,
    username: "tiToken",
    password: "tiToken",
    type: "ti",
    cabinet: "6D",
    reset_password_token: "LpWpzK4Jla9I87Aqtry",
    email: "test3@ti.com",
    prenom: "Momo"
  },
  {
    id: 52,
    username: "ad",
    password: "ad123",
    type: "individuel",
    reset_password_token: "LpWpzK4Jla9I87Aq",
    email: "marcel@paris.com",
    prenom: "Marcel"
  },
  {
    active: true,
    email: "johnhenry@paris.com",
    password: "test123456?",
    prenom: "john",
    type: "direction",
    username: "johnhenry"
  }
];

exports.seed = knex =>
  knex("users")
    .del()
    .insert(USERS.map(user => getInsertData(knex, user)));
