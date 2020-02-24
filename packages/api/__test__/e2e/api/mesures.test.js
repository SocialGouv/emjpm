const request = require("supertest");

const nodemailerMock = require("nodemailer-mock");
jest.setMock("nodemailer", nodemailerMock);

// Fake env
process.env.SMTP_FROM = "ne-pas-repondre@emjpm.gouv.fr";
process.env.APP_URL = "https://emjpm.gouv.fr";

const { knex } = global;
jest.setMock("@emjpm/api/src/db/knex", knex);

const server = require("@emjpm/api/src/app");

beforeAll(async () => {
  await knex.migrate.latest();
  await knex.seed.run();

  const name = "test-editor";
  const api_token = "test-token";
  const [editorId] = await knex("editors")
    .insert({ name, api_token })
    .returning("id");

  // await request(server)
  //   .post("/login")
  //   .send({
  //     username: "jeremy",
  //     password: "johnson123"
  //   });

  const res = await request(server)
    .post("/api/v2/oauth/authorize")
    .send({
      editorToken: api_token,
      editorId,
      userId: 1,
      redirectUrl: "http://localhost:3001"
    });

  const {
    body: { publicToken }
  } = res;

  global.token = publicToken;
});

afterEach(async () => {
  await knex("editors").delete();
});

describe("GET /api/v2/editors/mesures", () => {
  test("it returns 200", async () => {
    console.log(knex.client);

    const response = await request(server)
      .get("/api/v2/editors/mesures")
      .set("Accept", "application/json")
      .set({ Authorization: `Bearer ${global.token}` });

    expect(response.status).toBe(200);
  });
});
