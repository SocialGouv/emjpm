const request = require("supertest");

const nodemailerMock = require("nodemailer-mock");
jest.setMock("nodemailer", nodemailerMock);

// Fake env
process.env.SMTP_FROM = "ne-pas-repondre@emjpm.gouv.fr";
process.env.APP_URL = "https://emjpm.gouv.fr";
process.env.HASURA_WEB_HOOK_SECRET = "hasura-web-hook-test-valid-secret";

const { knex } = global;
jest.setMock("@emjpm/api/src/db/knex", knex);

const server = require("@emjpm/api/src/server");

const createHasuraTriggerEvent = (data, session_variables) => ({
  event: {
    data: {
      new: data,
    },
  },
  session_variables: session_variables
    ? session_variables
    : {
        // default test authentication
        "x-hasura-role": "fake-role",
        "x-hasura-user-id": 0,
        "x-hasura-service-id": 0,
      },
});

beforeAll(async () => {
  await knex.migrate.latest();
  await knex.seed.run();

  const [mesure] = await knex("mesures").where({ status: "Mesure en attente" });

  global.mesure = mesure;
});

afterEach(async () => {
  nodemailerMock.mock.reset();
});

describe("POST /hasura/events/email-reservation", () => {
  describe("when ti_id is not *already* set or ti not found", () => {
    test("it returns 200", async () => {
      const mesureWithInvalidTi = { ...global.mesure, ti_id: null };

      const response = await request(server)
        .post("/hasura/events/email-reservation")
        .set("hasura_web_hook_secret", process.env.HASURA_WEB_HOOK_SECRET)
        .set("Accept", "application/json")
        .send(createHasuraTriggerEvent(mesureWithInvalidTi));

      expect(response.status).toBe(200);
    });
  });

  test("it returns 200", async () => {
    const response = await request(server)
      .post("/hasura/events/email-reservation")
      .set("hasura_web_hook_secret", process.env.HASURA_WEB_HOOK_SECRET)
      .send(createHasuraTriggerEvent(global.mesure));

    expect(response.status).toBe(200);
  });
});
