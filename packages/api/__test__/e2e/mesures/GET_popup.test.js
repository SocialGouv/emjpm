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

test("should return mesures of user type prepose", async () => {
  const token = await getTokenByUserType("ti");
  const response = await request(server)
    .get("/api/v1/mesures/popup?searchType=prepose")
    .set("Authorization", "Bearer " + token);

  expect(response.body).toMatchSnapshot();

  expect(response.status).toBe(200);
});

test("should return mesures of user type individuel", async () => {
  const token = await getTokenByUserType("ti");
  const response = await request(server)
    .get("/api/v1/mesures/popup?searchType=individuel")
    .set("Authorization", "Bearer " + token);

  expect(response.body).toMatchSnapshot();

  expect(response.status).toBe(200);
});
