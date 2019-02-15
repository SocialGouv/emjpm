//

const request = require("supertest");

// Mock nodemailer before importing the server !
const nodemailerMock = require("nodemailer-mock");
jest.setMock("nodemailer", nodemailerMock);

// Fake env
process.env.SMTP_FROM = "ne-pas-repondre@emjpm.gouv.fr";

const server = require("@emjpm/api/app");
const knex = require("@emjpm/api/db/knex");

//

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

afterAll(async () => {
  await knex.destroy();
});

test("reset a password", async () => {
  const user = await knex("users")
    .where({ id: 52 })
    .first();

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

  expect(user).toMatchSnapshot({
    created_at: expect.any(Object),
    last_login: expect.any(Object),
    password: expect.any(String),
    reset_password_expires: expect.any(Object)
  });
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
  "message": "Not equal passwords.",
  "name": "UnprocessableEntityError",
  "stack": Any<String>,
  "status": 422,
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

//
