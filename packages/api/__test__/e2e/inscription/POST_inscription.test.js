//

const request = require("supertest");

const nodemailerMock = require("nodemailer-mock");
jest.setMock("nodemailer", nodemailerMock);

// Fake env
process.env.SMTP_FROM = "ne-pas-repondre@emjpm.gouv.fr";
process.env.APP_URL = "https://emjpm.gouv.fr";

const { knex } = global;
jest.setMock("@emjpm/api/db/knex", knex);

const server = require("@emjpm/api/app");
const { getAllTisByMandataire } = require("@emjpm/api/db/queries/tis");

//

beforeAll(async () => {
  await knex.migrate.latest();
  await knex.seed.run();
});

beforeEach(async () => {
  nodemailerMock.mock.reset();
});

const defaultRegister = {
  username: "toto",
  nom: "testAd",
  prenom: "testPrenom",
  etablissement: "",
  email: "toto@toto.com",
  type: "individuel",
  pass1: "secret",
  pass2: "secret",
  adresse: "",
  code_postal: "75010",
  ville: "",
  telephone: "",
  latitude: 2,
  longitude: 2
};

afterEach(async () => {
  // Remove created user
  const user = await knex("users")
    .where({ email: defaultRegister.email })
    .first();

  if (!user) {
    return;
  }

  try {
    await knex("user_tis")
      .where({ user_id: user.id })
      .delete();
  } catch (e) {
    // NOTE(douglasduteil): We ignore the error here.
    // Not all users have a `user_tis` relation.
  }

  await knex("mandataires")
    .where({ user_id: user.id })
    .delete();

  await knex("users")
    .where({ id: user.id })
    .delete();
});

test("should register with good values", async () => {
  const response = await request(server)
    .post("/api/v1/inscription/mandataires")
    .send(defaultRegister);

  expect(response.body).toMatchInlineSnapshot(`
Object {
  "success": true,
}
`);
  expect(response.status).toBe(200);

  expect(nodemailerMock.mock.sentMail()).toMatchSnapshot();

  const lastInsert = await knex
    .table("users")
    .orderBy("created_at", "desc")
    .first();
  expect(lastInsert).toMatchSnapshot({
    created_at: expect.any(Object),
    password: expect.any(String)
  });
});

test("should NOT register when pass1!==pass2", async () => {
  const response = await request(server)
    .post("/api/v1/inscription/mandataires")
    .send({
      ...defaultRegister,
      pass1: "hello",
      pass2: "world"
    });

  expect(response.body).toMatchInlineSnapshot(`
Object {
  "message": "Les mots de passe ne sont pas conformes",
  "success": false,
}
`);
  expect(response.status).toBe(422);
  expect(nodemailerMock.mock.sentMail().length).toBe(0);
});

test("should NOT register when email already exist", async () => {
  const response = await request(server)
    .post("/api/v1/inscription/mandataires")
    .send({
      ...defaultRegister,
      email: "marcel@paris.com"
    });

  expect(response.body).toMatchInlineSnapshot(`
Object {
  "message": "Un compte avec cet email existe déjà",
  "success": false,
}
`);
  expect(response.status).toBe(409);
  expect(nodemailerMock.mock.sentMail().length).toBe(0);
});

test("should NOT register when username already exist", async () => {
  const response = await request(server)
    .post("/api/v1/inscription/mandataires")
    .send({
      ...defaultRegister,
      username: "jeremy"
    });

  expect(response.body).toMatchInlineSnapshot(
    { stack: expect.any(String) },
    `
Object {
  "message": "Key (username)=(jeremy) already exists.",
  "name": "ConflictError",
  "stack": Any<String>,
  "status": 409,
}
`
  );
  expect(response.status).toBe(409);
  expect(nodemailerMock.mock.sentMail().length).toBe(0);
});

test("should NOT register when empty username", async () => {
  const response = await request(server)
    .post("/api/v1/inscription/mandataires")
    .send({
      ...defaultRegister,
      username: ""
    });

  expect(response.body).toMatchInlineSnapshot(`
Object {
  "message": "Les mots de passe ne sont pas conformes",
  "success": false,
}
`);
  expect(response.status).toBe(422);
  expect(nodemailerMock.mock.sentMail().length).toBe(0);
});

test("should add mandataire tis", async () => {
  const response = await request(server)
    .post("/api/v1/inscription/mandataires")
    .send({
      ...defaultRegister,
      tis: [1, 2]
    });

  expect(response.body).toMatchSnapshot();
  expect(response.status).toBe(200);
  expect(nodemailerMock.mock.sentMail()).toMatchSnapshot();

  const mandataire = await knex("mandataires")
    .orderBy("created_at", "desc")
    .first();
  const tis = await getAllTisByMandataire(mandataire.id);
  expect(tis.map(ti => ti.id)).toEqual([1, 2]);
});

test("should add user tis", async () => {
  const response = await request(server)
    .post("/api/v1/inscription/tis")
    .send({
      ...defaultRegister,
      username: "user_ti",
      type: "ti",
      cabinet: "2A",
      tis: [1]
    });

  expect(response.body).toMatchInlineSnapshot(`
Object {
  "success": true,
}
`);
  expect(response.status).toBe(200);
  expect(nodemailerMock.mock.sentMail()).toMatchSnapshot();

  const user = await knex
    .table("users")
    .orderBy("created_at", "desc")
    .first();
  expect(user.username).toEqual("user_ti");
  const user_tis = await knex
    .table("user_tis")
    .innerJoin("users", "users.id", "user_tis.user_id")
    .where("user_id", user.id)
    .first();
  expect(user_tis.cabinet).toEqual("2A");
  expect(user_tis.ti_id).toEqual(1);
});
