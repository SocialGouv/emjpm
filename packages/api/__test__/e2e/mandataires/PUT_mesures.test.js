//

const request = require("supertest");

// Fake env
process.env.SMTP_FROM = "ne-pas-repondre@emjpm.gouv.fr";
process.env.APP_URL = "https://emjpm.gouv.fr";

const server = require("@emjpm/api/app");
const knex = require("@emjpm/api/db/knex");

const { getTokenByUserType } = require("../utils");

beforeEach(async () => {
  await knex.migrate.latest();
  await knex.seed.run();
});

afterAll(async () => {
  await knex.destroy();
});

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

const getMesuresCount = async id =>
  (await knex("mandataires")
    .select("mesures_en_cours")
    .where({
      id
    })
    .first()).mesures_en_cours;

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
