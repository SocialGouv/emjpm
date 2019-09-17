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

// strip the created_at date in the response
// eslint-disable-next-line no-unused-vars
const simpler = ({ created_at, date_mesure_update, ...props }) => props;

test("should GET mandataire profile", async () => {
  const token = await getTokenByUserType("mandataire");
  const response = await request(server)
    .get("/api/v1/mandataires/1")
    .set("Authorization", "Bearer " + token);

  expect(simpler(response.body)).toMatchSnapshot();

  expect(response.status).toBe(200);
});

test("TI should NOT GET mandataire profile", async () => {
  const token = await getTokenByUserType("ti");
  const response = await request(server)
    .get("/api/v1/mandataires/1")
    .set("Authorization", "Bearer " + token);

  expect(simpler(response.body)).toMatchSnapshot({
    stack: expect.any(String)
  });

  expect(response.status).toBe(401);
});

test("TI should GET list of mandataires", async () => {
  const token = await getTokenByUserType("ti");
  const response = await request(server)
    .get("/api/v1/mandataires")
    .set("Authorization", "Bearer " + token);

  expect(response.body.map(simpler)).toMatchSnapshot();

  expect(response.status).toBe(200);
});
