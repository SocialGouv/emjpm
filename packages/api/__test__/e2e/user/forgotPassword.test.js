const request = require("supertest");
const { seedData } = require("@emjpm/api/database/seed-data");

const nodemailerMock = require("nodemailer-mock");

jest.setMock("nodemailer", nodemailerMock);

// Fake env
process.env.SMTP_FROM = "ne-pas-repondre@emjpm.gouv.fr";
process.env.APP_URL = "https://emjpm.gouv.fr";

const { databaseName, knex } = global;
jest.setMock("@emjpm/api/src/db/knex", knex);

const server = require("@emjpm/api/src/server");

beforeAll(async () => {
  await seedData(databaseName);

  const [user] = await knex("users").limit(1);

  global.user = user;
});

afterEach(async () => {
  nodemailerMock.mock.reset();
});

describe("POST /api/auth/forgot-password", () => {
  describe("when email is invalid or not found", () => {
    test("it returns 422", async () => {
      const response = await request(server)
        .post("/api/auth/forgot-password")
        .set("Accept", "application/json")
        .send({ body: { email: null } });

      expect(response.status).toBe(422);
    });

    test("it returns error message", async () => {
      const response = await request(server)
        .post("/api/auth/forgot-password")
        .set("Accept", "application/json")
        .send({ email: "notfound@notfound.com" });

      expect(response.body.error).not.toBeFalsy();
    });
  });

  test("it updates reset_password_token and reset_password_expires", async () => {
    await request(server)
      .post("/api/auth/forgot-password")
      .set("Accept", "application/json")
      .send({ email: global.user.email });

    const [user] = await knex("users").where({ id: global.user.id });

    expect(user.reset_password_token).toBeTruthy();
    expect(user.reset_password_expires).toBeTruthy();
  });

  test("it sends reset password email", async () => {
    await request(server)
      .post("/api/auth/forgot-password")
      .set("Accept", "application/json")
      .send({ email: global.user.email });

    expect(nodemailerMock.mock.sentMail().length).toBe(1);
  });

  test("it returns 200", async () => {
    const response = await request(server)
      .post("/api/auth/forgot-password")
      .set("Accept", "application/json")
      .send({ email: global.user.email });

    expect(response.status).toBe(200);
  });
});
