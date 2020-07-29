//

const request = require("supertest");

const nodemailerMock = require("nodemailer-mock");
jest.setMock("nodemailer", nodemailerMock);

// Fake env
process.env.SMTP_FROM = "ne-pas-repondre@emjpm.gouv.fr";
process.env.APP_URL = "https://emjpm.gouv.fr";

const { knex } = global;
jest.setMock("@emjpm/api/src/db/knex", knex);

const server = require("@emjpm/api/src/server");
const { getAllTisByMandataire } = require("@emjpm/api/src/db/queries/tis");

beforeAll(async () => {
  await knex.migrate.latest();
  await knex.seed.run();
});

beforeEach(async () => {
  nodemailerMock.mock.reset();
});

afterEach(async () => {
  // Remove created user
  const user = await knex("users")
    .where({ email: defaultRegister().user.email })
    .first();

  if (!user) {
    return;
  }

  try {
    await knex("user_role").where({ user_id: user.id }).delete();
    await knex("user_tis").where({ user_id: user.id }).delete();
  } catch (e) {
    // NOTE(douglasduteil): We ignore the error here.
    // Not all users have a `user_tis` relation.
  }

  const mandataire = await knex("mandataires")
    .where({ user_id: user.id })
    .first();

  if (mandataire) {
    await knex("mandataires").where({ id: mandataire.id }).delete();
  }

  await knex("magistrat").where({ user_id: user.id }).delete();

  await knex("users").where({ id: user.id }).delete();
});

const defaultRegister = (params) => ({
  user: {
    username: params && params.username != undefined ? params.username : "toto",
    nom: params && params.nom != undefined ? params.nom : "testAd",
    prenom: params && params.prenom != undefined ? params.prenom : "testPrenom",
    email: params && params.email != undefined ? params.email : "toto@toto.com",
    type: params && params.type != undefined ? params.type : "individuel",
    password:
      params && params.password != undefined ? params.password : "test123456?",
    passwordConfirmation:
      params && params.passwordConfirmation != undefined
        ? params.passwordConfirmation
        : "test123456?",
  },
  mandataire: {
    etablissement: "",
    adresse: "",
    code_postal: "75010",
    department_id: 1,
    ville: "",
    telephone: "",
  },
});

test("should register with good values", async () => {
  const response = await request(server)
    .post("/api/auth/signup")
    .send(defaultRegister());
  expect(response.body).toMatchInlineSnapshot(`
                Object {
                  "success": true,
                }
        `);
  expect(response.status).toBe(200);

  const lastInsert = await knex
    .table("users")
    .orderBy("created_at", "desc")
    .first();
  expect(lastInsert.username).toEqual("toto");
});

test("should send an email with good values", async () => {
  await request(server).post("/api/auth/signup").send(defaultRegister());
  expect(nodemailerMock.mock.sentMail().length).toBe(1);
  expect(nodemailerMock.mock.sentMail()).toMatchSnapshot();
});

test("created user should NOT be active", async () => {
  const response = await request(server)
    .post("/api/auth/signup")
    .send(defaultRegister());
  expect(response.body.success).toBe(true);
  expect(response.status).toBe(200);

  const lastInsert = await knex
    .table("users")
    .orderBy("created_at", "desc")
    .first();
  expect(lastInsert).toMatchSnapshot({
    created_at: expect.any(Object),
    password: expect.any(String),
  });
});

test("should NOT register when password!==passwordConfirmation", async () => {
  const response = await request(server)
    .post("/api/auth/signup")
    .send(
      defaultRegister({ password: "hello", passwordConfirmation: "world" })
    );

  expect(response.body).toMatchInlineSnapshot(
    { errors: expect.any(Array) },
    `
                    Object {
                      "errors": Any<Array>,
                    }
          `
  );
  expect(response.status).toBe(400);
  expect(nodemailerMock.mock.sentMail().length).toBe(0);
});

test("should NOT register when email already exist", async () => {
  const response = await request(server)
    .post("/api/auth/signup")
    .send(defaultRegister({ email: "marcel@paris.com" }));

  expect(response.body).toMatchInlineSnapshot(
    { errors: expect.any(Array) },
    `
                        Object {
                          "errors": Any<Array>,
                        }
            `
  );
  expect(nodemailerMock.mock.sentMail().length).toBe(0);
  expect(response.status).toBe(409);
});

test("should NOT register when username already exist", async () => {
  const response = await request(server)
    .post("/api/auth/signup")
    .send(defaultRegister({ username: "jeremy" }));

  expect(response.body).toMatchInlineSnapshot(
    { errors: expect.any(Array) },
    `
                        Object {
                          "errors": Any<Array>,
                        }
            `
  );
  expect(response.status).toBe(409);
  expect(nodemailerMock.mock.sentMail().length).toBe(0);
});

test("should NOT register when empty username", async () => {
  const response = await request(server)
    .post("/api/auth/signup")
    .send(defaultRegister({ username: "" }));
  expect(response.body).toMatchInlineSnapshot(
    { errors: expect.any(Array) },
    `
                Object {
                  "errors": Any<Array>,
                }
        `
  );
  expect(response.status).toBe(400);

  expect(nodemailerMock.mock.sentMail().length).toBe(0);
});

test("should add mandataire tis", async () => {
  const response = await request(server)
    .post("/api/auth/signup")
    .send({ ...defaultRegister(), tis: [1, 2] });

  expect(response.body).toMatchSnapshot();
  expect(response.status).toBe(200);
  expect(nodemailerMock.mock.sentMail()).toMatchSnapshot();

  const mandataire = await knex("mandataires")
    .orderBy("created_at", "desc")
    .first();
  const tis = await getAllTisByMandataire(mandataire.id);
  expect(tis.map((ti) => ti.id)).toEqual([1, 2]);
});

test("should add user tis", async () => {
  const response = await request(server)
    .post("/api/auth/signup")
    .send({
      ...defaultRegister({
        username: "user_ti",
        type: "ti",
      }),
      magistrat: {
        cabinet: "2A",
        ti: 1,
      },
    });

  expect(response.body).toMatchInlineSnapshot(`
    Object {
      "success": true,
    }
  `);
  expect(response.status).toBe(200);
  expect(nodemailerMock.mock.sentMail()).toMatchSnapshot();

  const user = await knex.table("users").orderBy("created_at", "desc").first();

  expect(user.username).toEqual("user_ti");
  const magistrat = await knex
    .table("magistrat")
    .innerJoin("users", "users.id", "magistrat.user_id")
    .where("user_id", user.id)
    .first();
  expect(magistrat.cabinet).toEqual("2A");
  expect(magistrat.ti_id).toEqual(1);
});
