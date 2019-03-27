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
const simplerComment = ({ created_at, ...props }) => props;

test("ti can read own commentaires", async () => {
  const token = await getTokenByUserType("ti");
  const response = await request(server)
    .get("/api/v1/mandataires/1/commentaires")
    .set("Authorization", "Bearer " + token);

  expect(response.body.map(simplerComment)).toMatchSnapshot();
  expect(response.status).toBe(200);
});

test("ti cannot read other tis commentaires", async () => {
  const token = await getTokenByUserType("ti");
  const response = await request(server)
    .get("/api/v1/mandataires/1/commentaires")
    .set("Authorization", "Bearer " + token);

  // there are 3 comments on mandataire_id=1 in the seeds, 2 from userTypes.ti
  expect(response.body.length).toEqual(2);
  expect(response.status).toBe(200);
});

test("user cannot read other mandataires commentaires", async () => {
  const token = await getTokenByUserType("ti");
  const response = await request(server)
    .get("/api/v1/mandataires/3/commentaires")
    .set("Authorization", "Bearer " + token);

  expect(response.status).toBe(401);
});
