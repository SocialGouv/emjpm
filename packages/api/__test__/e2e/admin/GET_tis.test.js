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
const simpler = ({ created_at, ...props }) => props;

test("should GET tis", async () => {
  const token = await getTokenByUserType("admin");
  const response = await request(server)
    .get("/api/v1/admin/tis")
    .set("Authorization", "Bearer " + token);

  expect(response.body.map(simpler)).toMatchSnapshot();

  expect(response.status).toBe(200);
});
