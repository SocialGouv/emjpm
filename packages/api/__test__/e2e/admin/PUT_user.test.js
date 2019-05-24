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

const { getTokenByUserType } = require("../utils");

//

beforeAll(async () => {
  await knex.migrate.latest();
  await knex.seed.run();
});

beforeEach(() => {
  nodemailerMock.mock.reset();
});

afterEach(async () => {
  await knex("users")
    .where({ username: "jeremy" })
    .update({ active: true });
});

test("admin should be able to change jeremy (user 1) profile", async () => {
  {
    const user = await knex("users")
      .where({ id: 1 })
      .first();
    expect(user.active).toBeTruthy();
  }

  const token = await getTokenByUserType("admin");
  const response = await request(server)
    .put("/api/v1/admin/user/1")
    .set("Authorization", "Bearer " + token)
    .send({ active: false });

  expect(response.body).toMatchSnapshot({
    created_at: expect.any(String),
    password: expect.any(String)
  });

  expect(response.status).toBe(200);

  expect(nodemailerMock.mock.sentMail().length).toBe(1);
  expect(nodemailerMock.mock.sentMail()).toMatchSnapshot();

  {
    const user = await knex("users")
      .where({ id: 1 })
      .first();
    expect(user.active).toBeFalsy;
  }
});

test("fail because only 'active' key can be patched", async () => {
  const token = await getTokenByUserType("admin");
  const response = await request(server)
    .put("/api/v1/admin/user/1")
    .set("Authorization", "Bearer " + token)
    .send({ foo: "bar" });

  expect(response.body).toMatchInlineSnapshot(
    { stack: expect.any(String) },
    `
            Object {
              "message": "Not 'active' field to patch.",
              "name": "UnprocessableEntityError",
              "stack": Any<String>,
              "status": 422,
            }
      `
  );

  expect(response.status).toBe(422);

  expect(nodemailerMock.mock.sentMail().length).toBe(0);
});

test("fail because user 1024 is not found ", async () => {
  const token = await getTokenByUserType("admin");
  const response = await request(server)
    .put("/api/v1/admin/user/1024")
    .set("Authorization", "Bearer " + token)
    .send({ active: true });

  expect(response.body).toMatchInlineSnapshot(
    { stack: expect.any(String) },
    `
    Object {
      "message": "User \\"1024\\" not Found",
      "name": "NotFoundError",
      "stack": Any<String>,
      "status": 404,
    }
  `
  );

  expect(response.status).toBe(404);

  expect(nodemailerMock.mock.sentMail().length).toBe(0);
});
