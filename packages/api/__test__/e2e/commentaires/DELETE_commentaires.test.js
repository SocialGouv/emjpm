//

const request = require("supertest");
const server = require("@emjpm/api/app");
const knex = require("@emjpm/api/db/knex");

const { getTokenByUserType, shouldBeProtected } = require("../utils");

beforeAll(async () => {
  await knex.migrate.latest();
  await knex.seed.run();
});

afterAll(async () => {
  await knex.destroy();
});

shouldBeProtected("DELETE", "/api/v1/mandataires/1/commentaires/1", {
  type: "ti"
});

// strip the created_at date in the response
const simplerComment = ({ created_at, ...props }) => props;

test("should delete commentaire for given mandataire and return response", async () => {
  const token = await getTokenByUserType("ti");
  const response = await request(server)
    .get("/api/v1/mandataires/1/commentaires")
    .set("Authorization", "Bearer " + token);
  const curComments = response.body;
  console.log(
    "curComments[curComments.length - 1].id",
    curComments[curComments.length - 1].id
  );
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
