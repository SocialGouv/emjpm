//

const request = require("supertest");

// Fake env
process.env.SMTP_FROM = "ne-pas-repondre@emjpm.gouv.fr";
process.env.APP_URL = "https://emjpm.gouv.fr";

const { knex } = global;
jest.setMock("@emjpm/api/db/knex", knex);

const server = require("@emjpm/api/app");

const { getTokenByUserType } = require("../utils");

//

beforeAll(async () => {
  await knex.migrate.latest();
  await knex.seed.run();
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
    created_at: expect.any(String),
    date_mesure_update: expect.any(String)
  });
  expect(response.status).toBe(200);
});
