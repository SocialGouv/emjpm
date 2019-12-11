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
const simplerComment = ({ created_at, ...props }) => props;

test("should delete commentaire for given mandataire and return response", async () => {
  const token = await getTokenByUserType("ti");
  const response = await request(server)
    .get("/api/v1/mandataires/1/commentaires")
    .set("Authorization", "Bearer " + token);
  const curComments = response.body;
  const del = await request(server)
    .delete(
      `/api/v1/mandataires/1/commentaires/${
        curComments[curComments.length - 1].id
      }`
    )
    .set("Authorization", "Bearer " + token);
  expect(del.status).toBe(200);
  expect(del.body.length).toBe(curComments.length - 1);
  expect(del.body.map(simplerComment)).toMatchSnapshot();
});

test("should NOT delete commentaire for another mandataire", async () => {
  const token = await getTokenByUserType("ti");
  const initialComments = await knex.from("commentaires").where({
    mandataire_id: 3
  });
  const del = await request(server)
    .delete(
      `/api/v1/mandataires/3/commentaires/${
        initialComments[initialComments.length - 1].id
      }`
    )
    .set("Authorization", "Bearer " + token);
  expect(del.status).toBe(401);
  const newComments = await knex.from("commentaires").where({
    mandataire_id: 3
  });
  expect(initialComments.length).toBe(newComments.length);
});
