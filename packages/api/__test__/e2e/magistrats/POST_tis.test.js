//
const request = require("supertest");
const nodemailerMock = require("nodemailer-mock");

const { knex } = global;
jest.setMock("@emjpm/api/db/knex", knex);

const server = require("@emjpm/api/app");

const { getTokenByUserType } = require("../utils");

beforeAll(async () => {
  await knex.migrate.latest();
  await knex.seed.run();
});

beforeEach(async () => {
  nodemailerMock.mock.reset();
});

const defaultRegister = {
  ti_id: 1
};

// eslint-disable-next-line no-unused-vars
const simpler = ({ created_at, ...props }) => props;

test("should add ti for a  mandataire", async () => {
  const token = await getTokenByUserType("mandataire");
  const response = await request(server)
    .post("/api/v1/mandataires/1/tis")
    .set("Authorization", "Bearer " + token)
    .send(defaultRegister);
  expect(response.status).toBe(200);

  const lastInsert = await knex
    .table("user_tis")
    .orderBy("created_at", "desc")
    .first();
  expect(simpler(lastInsert)).toMatchSnapshot();
});
