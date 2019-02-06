//

const request = require("supertest");

// Mock nodemailer before importing the server !
const nodemailerMock = require("nodemailer-mock")
jest.setMock("nodemailer", nodemailerMock);
jest.setMock("rand-token", { uid: jest.fn(() => 'kikoulol')});

// Fake env
process.env.SMTP_FROM = "ne-pas-repondre@emjpm.gouv.fr";
process.env.APP_URL = "https://emjpm.gouv.fr";

const server = require("@socialgouv/api/app");

beforeEach(() => {
  nodemailerMock.mock.reset();
});

test("send a forgot password email to ud@ud.com with correct token on request", async () => {
  const response = await request(server)
    .post("/auth/forgot_password")
    .send({
      email: "ud@ud.com"
    });
  expect(response.body).toMatchSnapshot();
  expect(nodemailerMock.mock.sentMail()).toMatchSnapshot();
  expect(response.status).toBe(200);
});

test("fail because udxxxx@ud.com is an invalid user", async () => {
  const response = await request(server)
    .post("/auth/forgot_password")
    .send({
      email: "udxxxx@ud.com"
    });
  expect(response.body).toMatchSnapshot({ stack: expect.any(String) });
  expect(nodemailerMock.mock.sentMail()).toEqual([]);
  expect(response.status).toBe(404);
});
