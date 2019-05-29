//

const request = require("supertest");

// Mock nodemailer before importing the server !
const nodemailerMock = require("nodemailer-mock");
jest.setMock("nodemailer", nodemailerMock);

// Fake env
process.env.SMTP_FROM = "ne-pas-repondre@emjpm.gouv.fr";

const { knex } = global;
jest.setMock("@emjpm/api/db/knex", knex);

const server = require("@emjpm/api/app");

//

beforeAll(async () => {
  await knex.migrate.latest();
  await knex.seed.run();
});

beforeEach(async () => {
  nodemailerMock.mock.reset();

  // The tests below will alter the user 52 password and reset_password_token
  // Before each tests we unsure that the user 52 is reset too.
  await knex("users")
    .where({ id: 52 })
    .update({
      password: "ad123",
      reset_password_token: "LpWpzK4Jla9I87Aq",
      reset_password_expires: knex.raw(`now() + interval '1 second'`),
      username: "ad"
    });
});

test("reset a password", async () => {
  const response = await request(server)
    .post("/auth/reset_password")
    .send({
      token: "LpWpzK4Jla9I87Aq",
      newPassword: "adad",
      verifyPassword: "adad"
    });
  expect(response.body).toMatchSnapshot();
  expect(nodemailerMock.mock.sentMail()).toMatchSnapshot();
  expect(response.status).toBe(200);
});

test("fail because the inputs don't match", async () => {
  const response = await request(server)
    .post("/auth/reset_password")
    .send({
      token: "LpWpzK4Jla9I87Aq",
      newPassword: "adad",
      verifyPassword: "tataadad"
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
  expect(response.status).toBe(422);
});

test("fail because nekot is not a valid token", async () => {
  const response = await request(server)
    .post("/auth/reset_password")
    .send({
      token: "nekot",
      newPassword: "adad",
      verifyPassword: "adad"
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
  expect(response.status).toBe(401);
});

test("fail because the token has expired", async () => {
  await knex("users")
    .where({ id: 52 })
    .update({
      reset_password_expires: knex.raw(`now() - interval '1 second'`)
    });

  const response = await request(server)
    .post("/auth/reset_password")
    .send({
      token: "LpWpzK4Jla9I87Aq",
      newPassword: "adad",
      verifyPassword: "adad"
    });
  expect(response.body).toMatchInlineSnapshot(
    { stack: expect.any(String) },
    `
    Object {
      "message": "Invalid token",
      "name": "UnauthorizedError",
      "stack": Any<String>,
      "status": 401,
    }
  `
  );
  expect(nodemailerMock.mock.sentMail()).toEqual([]);
  expect(response.status).toBe(401);
});

test("should empty user token+expiration on password reset", async () => {
  await knex("users")
    .where({ id: 52 })
    .update({
      reset_password_expires: knex.raw(`now() + interval '1 second'`),
      reset_password_token: "abcdef"
    });

  const response = await request(server)
    .post("/auth/reset_password")
    .send({
      token: "abcdef",
      newPassword: "adad",
      verifyPassword: "adad"
    });

  const userData = await knex("users")
    .where({ id: 52 })
    .first();

  expect(userData.reset_password_expires).toBeNull();
  expect(userData.reset_password_token).toBeNull();
  expect(response.body).toMatchSnapshot();
  expect(nodemailerMock.mock.sentMail().length).toEqual(1);
  expect(response.status).toBe(200);
});

//
