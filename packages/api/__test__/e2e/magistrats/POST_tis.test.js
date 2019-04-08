//
const request = require("supertest");

const server = require("@emjpm/api/app");

const knex = require("@emjpm/api/db/knex");
const { getTokenByUserType } = require("../utils");

beforeEach(async () => {
  await knex.seed.run();
});

afterAll(async () => {
  await knex.destroy();
});

const defaultRegister = {
  ti_id: 1
};

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

test("should add ti for a service", async () => {
  const token = await getTokenByUserType("service");
  const response = await request(server)
    .post("/api/v1/mandataires/1/tis")
    .set("Authorization", "Bearer " + token)
    .send(defaultRegister);
  expect(response.status).toBe(200);

  const lastInsert = await knex
    .table("service_tis")
    .orderBy("created_at", "desc")
    .first();
  expect(simpler(lastInsert)).toMatchSnapshot();
});
