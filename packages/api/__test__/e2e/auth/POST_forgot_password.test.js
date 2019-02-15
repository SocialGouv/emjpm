//

const request = require("supertest");

// Mock nodemailer before importing the server !
const nodemailerMock = require("nodemailer-mock");
jest.setMock("nodemailer", nodemailerMock);
jest.setMock("rand-token", { uid: jest.fn(() => "kikoulol") });

// Fake env
process.env.SMTP_FROM = "ne-pas-repondre@emjpm.gouv.fr";
process.env.APP_URL = "https://emjpm.gouv.fr";

const server = require("@emjpm/api/app");
const knex = require("@emjpm/api/db/knex");

beforeEach(() => {
  nodemailerMock.mock.reset();
});

afterAll(async () => {
  await knex.destroy();
});

test("send a forgot password email to ud@ud.com with correct token on request", async () => {
  const response = await request(server)
    .post("/auth/forgot_password")
    .send({
      email: "ud@ud.com"
    });
  expect(response.body).toMatchInlineSnapshot(`""`);
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
  "message": "User \\"udxxxx@ud.com\\" not Found",
  "name": "NotFoundError",
  "stack": Any<String>,
  "status": 404,
}
`
  );
  expect(nodemailerMock.mock.sentMail()).toEqual([]);
  expect(response.status).toBe(404);
});
