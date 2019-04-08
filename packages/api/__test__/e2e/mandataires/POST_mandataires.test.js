//
const request = require("supertest");

const server = require("@emjpm/api/app");

const knex = require("@emjpm/api/db/knex");
const { getTokenByUserType } = require("../utils");

beforeEach(async () => {
  await knex.seed.run();
});

afterAll(async () => {
  await knex.destroy();
});

const defaultRegister = {
  contact_nom: "testMandaAd",
  contact_prenom: "testPrenom",
  etablissement: "",
  contact_email: "totoManda@toto.com",
  type: "service",
  adresse: "",
  code_postal: "75010",
  ville: "",
  telephone: ""
};

const simpler = ({ created_at, ...props }) => props;

test("should register with good values", async () => {
  const token = await getTokenByUserType("service");
  const response = await request(server)
    .post("/api/v1/mandataires")
    .set("Authorization", "Bearer " + token)
    .send(defaultRegister);
  expect(response.body.success).toBe(true);
  expect(response.status).toBe(200);

  const lastInsert = await knex
    .table("mandataires")
    .orderBy("created_at", "desc")
    .first();
  expect(simpler(lastInsert)).toMatchSnapshot();
});
