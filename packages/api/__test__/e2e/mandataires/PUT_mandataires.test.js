//

const request = require("supertest");

// Fake env
process.env.SMTP_FROM = "ne-pas-repondre@emjpm.gouv.fr";
process.env.APP_URL = "https://emjpm.gouv.fr";

const server = require("@emjpm/api/app");
const knex = require("@emjpm/api/db/knex");

const { getTokenByUserType } = require("../utils");

beforeEach(async () => {
  await knex.seed.run();
});

afterAll(async () => {
  await knex.destroy();
});

test("mandataire should update his profile", async () => {
  const token = await getTokenByUserType("mandataire");
  const newProfile = {
    email: "test@email.com",
    telephone: "phone-test"
  };

  const response = await request(server)
    .put(`/api/v1/mandataires/1`)
    .set("Authorization", "Bearer " + token)
    .send(newProfile);

  const newProfileRow = await knex("mandataires")
    .where({ id: 1 })
    .first();

  const newUserRow = await knex("users")
    .where({ id: 1 })
    .first();

  expect(newProfileRow.telephone).toBe(newProfile.telephone);
  expect(newUserRow.email).toBe(newProfile.email);

  expect(response.body).toMatchSnapshot({
    created_at: expect.any(String)
  });
  expect(response.status).toBe(200);
});
