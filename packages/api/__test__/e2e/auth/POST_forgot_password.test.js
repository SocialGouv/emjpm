//

const request = require("supertest");

// Mock nodemailer before importing the server !
const nodemailerMock = require("nodemailer-mock");
jest.setMock("nodemailer", nodemailerMock);
jest.setMock("rand-token", { uid: jest.fn(() => "kikoulol") });

// Fake env
process.env.SMTP_FROM = "ne-pas-repondre@emjpm.gouv.fr";
process.env.APP_URL = "https://emjpm.gouv.fr";

const { knex } = global;
jest.setMock("@emjpm/api/db/knex", knex);

const server = require("@emjpm/api/app");

//

beforeAll(async () => {
  await knex.migrate.latest();
  await knex.seed.run();
});

beforeEach(() => {
  nodemailerMock.mock.reset();
});

test("send a forgot password email to ud@ud.com with correct token on request", async () => {
  const response = await request(server)
    .post("/auth/forgot_password")
    .send({
      email: "ud@ud.com"
    });
  expect(response.body).toMatchInlineSnapshot(`
    Object {
      "message": "Cannot read property 'from' of undefined",
      "name": "TypeError",
      "stack": "TypeError: Cannot read property 'from' of undefined
        at from (/Users/christophedumont/Workspace/emjpm/packages/api/db/queries/users.js:18:6)
        at getSpecificUser (/Users/christophedumont/Workspace/emjpm/packages/api/routes/auth.js:216:3)
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
  expect(nodemailerMock.mock.sentMail()).toMatchSnapshot();
  expect(response.status).toBe(200);
});

test("fail because udxxxx@ud.com is an invalid user", async () => {
  const response = await request(server)
    .post("/auth/forgot_password")
    .send({
      email: "udxxxx@ud.com"
    });
  expect(response.body).toMatchInlineSnapshot(
    { stack: expect.any(String) },
    `
    Object {
      "message": "Cannot read property 'from' of undefined",
      "name": "TypeError",
      "stack": Any<String>,
    }
  `
  );
  expect(nodemailerMock.mock.sentMail()).toEqual([]);
  expect(response.status).toBe(404);
});
