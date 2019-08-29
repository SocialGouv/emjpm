//

const request = require("supertest");

const { knex } = global;
jest.setMock("@emjpm/api/db/knex", knex);

const server = require("@emjpm/api/app");

beforeAll(async () => {
  await knex.migrate.latest();
  await knex.seed.run();
});

test("should return list of tis by region", async () => {
  const response = await request(server).get("/auth/tis");
  expect(response.body).toMatchSnapshot();
  expect(response.status).toBe(200);
});
