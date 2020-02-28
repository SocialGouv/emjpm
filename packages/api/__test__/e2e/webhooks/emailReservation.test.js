const request = require("supertest");

const nodemailerMock = require("nodemailer-mock");
jest.setMock("nodemailer", nodemailerMock);

// Fake env
process.env.SMTP_FROM = "ne-pas-repondre@emjpm.gouv.fr";
process.env.APP_URL = "https://emjpm.gouv.fr";

const { knex } = global;
jest.setMock("@emjpm/api/src/db/knex", knex);

const server = require("@emjpm/api/src/app");

const createHasuraTriggerEvent = data => ({
  event: {
    data: {
      new: data
    }
  }
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

describe("POST /webhook/email-reservation", () => {
  describe("when ti_id is not *already* set or ti not found", () => {
    test("it returns 200", async () => {
      const mesureWithInvalidTi = { ...global.mesure, ti_id: null };

      const response = await request(server)
        .post("/webhook/email-reservation")
        .set("Accept", "application/json")
        .send(createHasuraTriggerEvent(mesureWithInvalidTi));

      expect(response.status).toBe(200);
    });
  });

  test("it returns 200", async () => {
    const response = await request(server)
      .post("/webhook/email-reservation")
      .set("Accept", "application/json")
      .send(createHasuraTriggerEvent(global.mesure));

    expect(response.status).toBe(200);
  });
});
