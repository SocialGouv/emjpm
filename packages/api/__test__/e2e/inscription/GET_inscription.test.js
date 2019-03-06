//

const request = require("supertest");
const server = require("@emjpm/api/app");
const knex = require("@emjpm/api/db/knex");

afterAll(async () => {
  await knex.destroy();
});

test("should return list of tis by region", async () => {
  const response = await request(server).get("/api/v1/inscription/tis");
  expect(response.body).toMatchSnapshot();
  expect(response.status).toBe(200);
});
