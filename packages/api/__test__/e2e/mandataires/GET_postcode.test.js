//

const request = require("supertest");

const { knex } = global;
jest.setMock("@emjpm/api/db/knex", knex);

const server = require("@emjpm/api/app");

const { getTokenByUserType } = require("../utils");

//

beforeAll(async () => {
  await knex.migrate.latest();
  await knex.seed.run();
});

test("should get mandataires for postcode 62000", async () => {
  const token = await getTokenByUserType("mandataire");
  const response = await request(server)
    .get("/api/v1/mandataires/postcode/62000")
    .set("Authorization", "Bearer " + token);

  expect(response.body).toMatchSnapshot();
  expect(response.status).toBe(200);
});
