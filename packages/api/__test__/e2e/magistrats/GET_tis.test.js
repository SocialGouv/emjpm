//

const request = require("supertest");

const { knex } = global;
jest.setMock("@emjpm/api/db/knex", knex);

const server = require("@emjpm/api/app");

const { getTokenByUserType } = require("../utils");

beforeAll(async () => {
  await knex.migrate.latest();
  await knex.seed.run();
});

const simpler = ({ created_at, ...props }) => props;

test("should GET tis for one mandataire ", async () => {
  const token = await getTokenByUserType("mandataire");
  const response = await request(server)
    .get("/api/v1/mandataires/1/tis")
    .set("Authorization", "Bearer " + token);

  expect(simpler(response.body)).toMatchSnapshot();
  expect(response.status).toBe(200);
});
