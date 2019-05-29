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
  expect(response.body).toMatchInlineSnapshot(`
    Object {
      "message": "knex is not a function",
      "name": "TypeError",
      "stack": "TypeError: knex is not a function
        at knex (/Users/christophedumont/Workspace/emjpm/packages/api/db/queries/users.js:23:3)
        at getCountByEmail (/Users/christophedumont/Workspace/emjpm/packages/api/routes/inscription.js:224:31)
        at Layer.handle [as handle_request] (/Users/christophedumont/Workspace/emjpm/node_modules/express/lib/router/layer.js:95:5)
        at next (/Users/christophedumont/Workspace/emjpm/node_modules/express/lib/router/route.js:137:13)
        at Route.dispatch (/Users/christophedumont/Workspace/emjpm/node_modules/express/lib/router/route.js:112:3)
        at Layer.handle [as handle_request] (/Users/christophedumont/Workspace/emjpm/node_modules/express/lib/router/layer.js:95:5)
        at /Users/christophedumont/Workspace/emjpm/node_modules/express/lib/router/index.js:281:22
        at Function.process_params (/Users/christophedumont/Workspace/emjpm/node_modules/express/lib/router/index.js:335:12)
        at next (/Users/christophedumont/Workspace/emjpm/node_modules/express/lib/router/index.js:275:10)
        at Function.handle (/Users/christophedumont/Workspace/emjpm/node_modules/express/lib/router/index.js:174:3)
        at router (/Users/christophedumont/Workspace/emjpm/node_modules/express/lib/router/index.js:47:12)
        at Layer.handle [as handle_request] (/Users/christophedumont/Workspace/emjpm/node_modules/express/lib/router/layer.js:95:5)
        at trim_prefix (/Users/christophedumont/Workspace/emjpm/node_modules/express/lib/router/index.js:317:13)
        at /Users/christophedumont/Workspace/emjpm/node_modules/express/lib/router/index.js:284:7
        at Function.process_params (/Users/christophedumont/Workspace/emjpm/node_modules/express/lib/router/index.js:335:12)
        at next (/Users/christophedumont/Workspace/emjpm/node_modules/express/lib/router/index.js:275:10)
        at initialize (/Users/christophedumont/Workspace/emjpm/node_modules/passport/lib/middleware/initialize.js:53:5)
        at Layer.handle [as handle_request] (/Users/christophedumont/Workspace/emjpm/node_modules/express/lib/router/layer.js:95:5)
        at trim_prefix (/Users/christophedumont/Workspace/emjpm/node_modules/express/lib/router/index.js:317:13)
        at /Users/christophedumont/Workspace/emjpm/node_modules/express/lib/router/index.js:284:7
        at Function.process_params (/Users/christophedumont/Workspace/emjpm/node_modules/express/lib/router/index.js:335:12)
        at next (/Users/christophedumont/Workspace/emjpm/node_modules/express/lib/router/index.js:275:10)
        at urlencodedParser (/Users/christophedumont/Workspace/emjpm/node_modules/body-parser/lib/types/urlencoded.js:82:7)
        at Layer.handle [as handle_request] (/Users/christophedumont/Workspace/emjpm/node_modules/express/lib/router/layer.js:95:5)
        at trim_prefix (/Users/christophedumont/Workspace/emjpm/node_modules/express/lib/router/index.js:317:13)
        at /Users/christophedumont/Workspace/emjpm/node_modules/express/lib/router/index.js:284:7
        at Function.process_params (/Users/christophedumont/Workspace/emjpm/node_modules/express/lib/router/index.js:335:12)
        at next (/Users/christophedumont/Workspace/emjpm/node_modules/express/lib/router/index.js:275:10)
        at /Users/christophedumont/Workspace/emjpm/node_modules/body-parser/lib/read.js:130:5
        at invokeCallback (/Users/christophedumont/Workspace/emjpm/node_modules/raw-body/index.js:224:16)
        at done (/Users/christophedumont/Workspace/emjpm/node_modules/raw-body/index.js:213:7)
        at IncomingMessage.onEnd (/Users/christophedumont/Workspace/emjpm/node_modules/raw-body/index.js:273:7)
        at IncomingMessage.emit (events.js:188:13)
        at IncomingMessage.EventEmitter.emit (domain.js:441:20)
        at endReadableNT (_stream_readable.js:1129:12)
        at process.internalTickCallback (internal/process/next_tick.js:72:19)",
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

  expect(response.body).toMatchInlineSnapshot(
    { stack: expect.any(String) },
    `
        Object {
          "message": "Les mots de passe ne sont pas conformes",
          "name": "UnprocessableEntityError",
          "stack": Any<String>,
          "status": 422,
        }
    `
  );
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

  expect(response.body).toMatchInlineSnapshot(
    { stack: expect.any(String) },
    `
    Object {
      "message": "knex is not a function",
      "name": "TypeError",
      "stack": Any<String>,
    }
  `
  );
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

  expect(response.body).toMatchInlineSnapshot(
    { stack: expect.any(String) },
    `
    Object {
      "message": "knex is not a function",
      "name": "TypeError",
      "stack": Any<String>,
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
  expect(response.body).toMatchInlineSnapshot(
    { stack: expect.any(String) },
    `
        Object {
          "message": "Les mots de passe ne sont pas conformes",
          "name": "UnprocessableEntityError",
          "stack": Any<String>,
          "status": 422,
        }
    `
  );
  expect(response.status).toBe(422);

  expect(nodemailerMock.mock.sentMail().length).toBe(0);
  expect(response.body).toMatchInlineSnapshot(
    { stack: expect.any(String) },
    `
        Object {
          "message": "Les mots de passe ne sont pas conformes",
          "name": "UnprocessableEntityError",
          "stack": Any<String>,
          "status": 422,
        }
    `
  );
  expect(response.status).toBe(422);
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
      "message": "Cannot read property 'transaction' of undefined",
      "name": "TypeError",
      "stack": "TypeError: Cannot read property 'transaction' of undefined
        at transaction (/Users/christophedumont/Workspace/emjpm/packages/api/routes/inscription.js:364:6)
        at Layer.handle [as handle_request] (/Users/christophedumont/Workspace/emjpm/node_modules/express/lib/router/layer.js:95:5)
        at next (/Users/christophedumont/Workspace/emjpm/node_modules/express/lib/router/route.js:137:13)
        at Route.dispatch (/Users/christophedumont/Workspace/emjpm/node_modules/express/lib/router/route.js:112:3)
        at Layer.handle [as handle_request] (/Users/christophedumont/Workspace/emjpm/node_modules/express/lib/router/layer.js:95:5)
        at /Users/christophedumont/Workspace/emjpm/node_modules/express/lib/router/index.js:281:22
        at Function.process_params (/Users/christophedumont/Workspace/emjpm/node_modules/express/lib/router/index.js:335:12)
        at next (/Users/christophedumont/Workspace/emjpm/node_modules/express/lib/router/index.js:275:10)
        at Function.handle (/Users/christophedumont/Workspace/emjpm/node_modules/express/lib/router/index.js:174:3)
        at router (/Users/christophedumont/Workspace/emjpm/node_modules/express/lib/router/index.js:47:12)
        at Layer.handle [as handle_request] (/Users/christophedumont/Workspace/emjpm/node_modules/express/lib/router/layer.js:95:5)
        at trim_prefix (/Users/christophedumont/Workspace/emjpm/node_modules/express/lib/router/index.js:317:13)
        at /Users/christophedumont/Workspace/emjpm/node_modules/express/lib/router/index.js:284:7
        at Function.process_params (/Users/christophedumont/Workspace/emjpm/node_modules/express/lib/router/index.js:335:12)
        at next (/Users/christophedumont/Workspace/emjpm/node_modules/express/lib/router/index.js:275:10)
        at initialize (/Users/christophedumont/Workspace/emjpm/node_modules/passport/lib/middleware/initialize.js:53:5)
        at Layer.handle [as handle_request] (/Users/christophedumont/Workspace/emjpm/node_modules/express/lib/router/layer.js:95:5)
        at trim_prefix (/Users/christophedumont/Workspace/emjpm/node_modules/express/lib/router/index.js:317:13)
        at /Users/christophedumont/Workspace/emjpm/node_modules/express/lib/router/index.js:284:7
        at Function.process_params (/Users/christophedumont/Workspace/emjpm/node_modules/express/lib/router/index.js:335:12)
        at next (/Users/christophedumont/Workspace/emjpm/node_modules/express/lib/router/index.js:275:10)
        at urlencodedParser (/Users/christophedumont/Workspace/emjpm/node_modules/body-parser/lib/types/urlencoded.js:82:7)
        at Layer.handle [as handle_request] (/Users/christophedumont/Workspace/emjpm/node_modules/express/lib/router/layer.js:95:5)
        at trim_prefix (/Users/christophedumont/Workspace/emjpm/node_modules/express/lib/router/index.js:317:13)
        at /Users/christophedumont/Workspace/emjpm/node_modules/express/lib/router/index.js:284:7
        at Function.process_params (/Users/christophedumont/Workspace/emjpm/node_modules/express/lib/router/index.js:335:12)
        at next (/Users/christophedumont/Workspace/emjpm/node_modules/express/lib/router/index.js:275:10)
        at /Users/christophedumont/Workspace/emjpm/node_modules/body-parser/lib/read.js:130:5
        at invokeCallback (/Users/christophedumont/Workspace/emjpm/node_modules/raw-body/index.js:224:16)
        at done (/Users/christophedumont/Workspace/emjpm/node_modules/raw-body/index.js:213:7)
        at IncomingMessage.onEnd (/Users/christophedumont/Workspace/emjpm/node_modules/raw-body/index.js:273:7)
        at IncomingMessage.emit (events.js:188:13)
        at IncomingMessage.EventEmitter.emit (domain.js:441:20)
        at endReadableNT (_stream_readable.js:1129:12)
        at process.internalTickCallback (internal/process/next_tick.js:72:19)",
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
