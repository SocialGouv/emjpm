//

const request = require("supertest");

const nodemailerMock = require("nodemailer-mock");
jest.setMock("nodemailer", nodemailerMock);

// Fake env
process.env.SMTP_FROM = "ne-pas-repondre@emjpm.gouv.fr";
process.env.APP_URL = "https://emjpm.gouv.fr";

const server = require("@emjpm/api/app");
const { getAllTisByMandataire } = require("@emjpm/api/db/queries/tis");
const knex = require("@emjpm/api/db/knex");

beforeEach(async () => {
  await knex.seed.run();
  nodemailerMock.mock.reset();
});

afterAll(async () => {
  await knex.destroy();
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

test("should register with good values", async () => {
  const response = await request(server)
    .post("/api/v1/inscription/mandataires")
    .send(defaultRegister);
  expect(response.body.success).toBe(true);
  expect(response.status).toBe(200);

  const lastInsert = await knex
    .table("users")
    .orderBy("created_at", "desc")
    .first();
  expect(lastInsert.username).toEqual("toto");
});

test("should send an email with good values", async () => {
  await request(server)
    .post("/api/v1/inscription/mandataires")
    .send(defaultRegister);

  expect(nodemailerMock.mock.sentMail().length).toBe(1);
  expect(nodemailerMock.mock.sentMail()).toMatchSnapshot();
});

test("created user should NOT be active", async () => {
  const response = await request(server)
    .post("/api/v1/inscription/mandataires")
    .send(defaultRegister);
  expect(response.body.success).toBe(true);
  expect(response.status).toBe(200);

  const lastInsert = await knex
    .table("users")
    .orderBy("created_at", "desc")
    .first();
  expect(lastInsert.active).toBe(false);
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

  expect(response.body).toMatchSnapshot({
    success: false,
    message: "Un compte avec cet email existe déjà"
  });
  expect(nodemailerMock.mock.sentMail().length).toBe(0);
  expect(response.status).toBe(409);
});

test("should NOT register when username already exist", async () => {
  const response = await request(server)
    .post("/api/v1/inscription/mandataires")
    .send({
      ...defaultRegister,
      username: "jeremy"
    });

  expect(nodemailerMock.mock.sentMail().length).toBe(0);
  expect(response.status).toBe(500);
});

test("should NOT register when empty username", async () => {
  const response = await request(server)
    .post("/api/v1/inscription/mandataires")
    .send({
      ...defaultRegister,
      username: ""
    });
  expect(nodemailerMock.mock.sentMail().length).toBe(0);
  expect(response.status).toBe(500);
});

test("should add mandataire tis", async () => {
  await request(server)
    .post("/api/v1/inscription/mandataires")
    .send({
      ...defaultRegister,
      tis: [1, 2]
    });

  const mandataire = await knex
    .table("mandataires")
    .orderBy("created_at", "desc")
    .first();
  const tis = await getAllTisByMandataire(mandataire.id);
  expect(tis.map(ti => ti.id)).toEqual([1, 2]);
});

test("should add user tis", async () => {
  await request(server)
    .post("/api/v1/inscription/tis")
    .send({
      ...defaultRegister,
      username: "user_ti",
      type: "ti",
      cabinet: "2A",
      tis: [1]
    });

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
