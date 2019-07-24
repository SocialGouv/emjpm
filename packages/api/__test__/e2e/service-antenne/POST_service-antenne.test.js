//

const request = require("supertest");
const nodemailerMock = require("nodemailer-mock");
jest.setMock("nodemailer", nodemailerMock);

process.env.SMTP_FROM = "ne-pas-repondre@emjpm.gouv.fr";
process.env.APP_URL = "https://emjpm.gouv.fr";

const { knex } = global;
jest.setMock("@emjpm/api/db/knex", knex);

const server = require("@emjpm/api/app");

const { getTokenByUserType } = require("../utils");

beforeAll(async () => {
  await knex.migrate.latest();
  await knex.seed.run();
});

beforeEach(async () => {
  nodemailerMock.mock.reset();
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
  telephone: "",
  tis: [1],
  service_id: 1
};

// eslint-disable-next-line no-unused-vars
const simpler = ({ created_at, ...props }) => props;

test("should create a mandataire with antenne", async () => {
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
