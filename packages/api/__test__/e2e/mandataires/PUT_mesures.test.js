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

afterEach(async () => {
  await knex("mesures")
    .where({ ville: sampleMesure.ville })
    .delete();
});

test("mandataire should PUT his mesure", async () => {
  const token = await getTokenByUserType("mandataire");

  const newMesureId = await knex("mesures")
    .insert({
      ...sampleMesure,
      mandataire_id: 1,
      ti_id: 1
    })
    .returning("id")
    .then(res => res[0]);

  const response = await request(server)
    .put(`/api/v1/mandataires/1/mesures/${newMesureId}`)
    .set("Authorization", "Bearer " + token)
    .send({
      etablissement: "DRUID"
    });

  const newMesure = await knex("mesures")
    .where({ id: newMesureId })
    .first();

  expect(newMesure.etablissement).toBe("DRUID");

  expect(response.body).toMatchSnapshot();
  expect(response.status).toBe(200);
});

test("mandataire should NOT PUT other mandataire mesure", async () => {
  const token = await getTokenByUserType("mandataire");

  const newMesureId = await knex("mesures")
    .insert({
      ...sampleMesure,
      mandataire_id: 2,
      ti_id: 1
    })
    .returning("id")
    .then(res => res[0]);

  const response = await request(server)
    .put(`/api/v1/mandataires/2/mesures/${newMesureId}`)
    .set("Authorization", "Bearer " + token)
    .send({
      etablissement: "DRUID"
    });

  const newMesure = await knex("mesures")
    .where({ id: newMesureId })
    .first();

  expect(newMesure.etablissement).toBe("ROOKIE");

  expect(response.body).toMatchSnapshot();
  expect(response.status).toBe(200);
});

test("TI should PUT his mandataire mesure", async () => {
  const token = await getTokenByUserType("ti");

  const newMesureId = await knex("mesures")
    .insert({
      ...sampleMesure,
      mandataire_id: 1,
      ti_id: 2
    })
    .returning("id")
    .then(res => res[0]);

  const response = await request(server)
    .put(`/api/v1/mandataires/1/mesures/${newMesureId}`)
    .set("Authorization", "Bearer " + token)
    .send({
      id: newMesureId,
      etablissement: "DRUID"
    });

  const newMesure = await knex("mesures")
    .where({ id: newMesureId })
    .first();

  expect(newMesure.etablissement).toBe("DRUID");

  expect(response.body).toMatchSnapshot();
  expect(response.status).toBe(200);
});

test("TI should NOT PUT other TI mesure", async () => {
  const token = await getTokenByUserType("ti");
  const newMesureId = await knex("mesures")
    .insert({
      ...sampleMesure,
      mandataire_id: 1,
      ti_id: 1
    })
    .returning("id")
    .then(res => res[0]);

  const response = await request(server)
    .put(`/api/v1/mandataires/1/mesures/${newMesureId}`)
    .set("Authorization", "Bearer " + token)
    .send({
      id: newMesureId,
      etablissement: "DRUID"
    });

  const newMesure = await knex("mesures")
    .where({ id: newMesureId })
    .first();

  expect(newMesure.etablissement).toBe("ROOKIE");

  expect(response.body).toMatchSnapshot();
  expect(response.status).toBe(200);
});

//

const sampleMesure = {
  code_postal: "28000",
  ville: "Chartres",
  etablissement: "ROOKIE",
  created_at: "2010-10-05",
  annee: "2010-10-05",
  type: "preposes",
  date_ouverture: "2010-10-05",
  residence: "oui",
  civilite: "madame",
  status: "Mesure en cours"
};
