//

const request = require("supertest");
const server = require("@emjpm/api/app");
const knex = require("@emjpm/api/db/knex");


const { getTokenByUserType } = require("../utils");

beforeAll(async () => {
  await knex.seed.run();
});

afterAll(async () => {
  await knex.destroy();
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


