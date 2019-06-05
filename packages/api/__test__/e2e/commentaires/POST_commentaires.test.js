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

test("should post commentaire for given mandataire and return response", async () => {
  const token = await getTokenByUserType("ti");
  const response = await request(server)
    .get("/api/v1/mandataires/1/commentaires")
    .set("Authorization", "Bearer " + token);
  const curComments = response.body;
  const post = await request(server)
    .post("/api/v1/mandataires/1/commentaires")
    .set("Authorization", "Bearer " + token)
    .send({
      comment: "this is a super comment"
    });
  expect(post.status).toBe(200);
  expect(post.body.length).toBe(curComments.length + 1);
  expect(post.body.map(simplerComment)).toMatchSnapshot();
});

test("should NOT post commentaire for mandataire not in my TI", async () => {
  const token = await getTokenByUserType("ti");
  const initialCount = (await knex
    .from("commentaires")
    .where({
      mandataire_id: 3
    })
    .count())[0].count;
  const post = await request(server)
    .post("/api/v1/mandataires/3/commentaires")
    .set("Authorization", "Bearer " + token)
    .send({
      comment: "this is a super comment"
    });
  expect(post.status).toBe(401);
  const newCount = (await knex
    .from("commentaires")
    .where({
      mandataire_id: 3
    })
    .count())[0].count;
  expect(newCount).toBe(initialCount);
});
