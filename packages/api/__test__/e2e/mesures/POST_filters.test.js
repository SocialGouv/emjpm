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
/* eslint-disable no-unused-vars */
const simpler = ({ created_at, ...props }) => props;
/* eslint-enable no-unused-vars */

test("should get mesures filtered by localisation", async () => {
  const token = await getTokenByUserType("ti");
  const response = await request(server)
    .post("/api/v1/mesures/filters")
    .set("Authorization", "Bearer " + token)
    .send({
      latNorthEast: 1,
      latSouthWest: 0,
      longNorthEast: 1,
      longSouthWest: 0
    });

  expect(response.body.map(simpler)).toMatchSnapshot();

  expect(response.status).toBe(200);
});
