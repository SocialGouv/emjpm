//

const request = require("supertest");
const nodemailerMock = require("nodemailer-mock");
jest.setMock("nodemailer", nodemailerMock);

// Fake env
process.env.SMTP_FROM = "ne-pas-repondre@emjpm.gouv.fr";
process.env.APP_URL = "https://emjpm.gouv.fr";

const server = require("@emjpm/api/app");
const knex = require("@emjpm/api/db/knex");

const { getTokenByUserType } = require("../utils");

beforeEach(async () => {
  await knex.seed.run();
  nodemailerMock.mock.reset();
});

afterAll(async () => {
  await knex.destroy();
});

const sampleMesure = {
  code_postal: "28000",
  ville: "Chartres",
  etablissement: "peu pas",
  created_at: "2010-10-05",
  annee: "2010-10-05",
  type: "preposes",
  date_ouverture: "2010-10-05",
  residence: "oui",
  civilite: "madame",
  status: "Mesure en cours"
  // mandataire_id: 1
};

const getMesuresCounter = async id =>
  (await knex("mandataires")
    .select("mesures_en_cours")
    .where({
      id
    })
    .first()).mesures_en_cours;

const getMesuresCount = async mandataire_id =>
  (await knex("mesures").where({
    mandataire_id
  })).length;

test("mandataire should POST mesure", async () => {
  const token = await getTokenByUserType("mandataire");
  const currentMesures = await knex("mesures").where({
    mandataire_id: 1,
    status: "Mesure en cours"
  });
  const response = await request(server)
    .post("/api/v1/mandataires/1/mesures")
    .set("Authorization", "Bearer " + token)
    .send(sampleMesure);

  expect(response.body.length).toBe(currentMesures.length + 1);
  expect(response.body).toMatchSnapshot();
  expect(response.status).toBe(200);

  expect(nodemailerMock.mock.sentMail().length).toBe(0);
});

test("mandataire should NOT POST mesure for another one [REST url abuse]", async () => {
  const token = await getTokenByUserType("mandataire");
  // when mandataire posts, only user.mandataire_id is used on the server as source of truth to post the mesure
  // when ti posts, we use body.mandataire_id
  // the only way to ensure mesures are affected is to test
  const mesuresCount1 = await getMesuresCount(1);
  const mesuresCount2 = await getMesuresCount(2);

  const response = await request(server)
    .post("/api/v1/mandataires/2/mesures")
    .set("Authorization", "Bearer " + token)
    .send(sampleMesure);

  expect(response.status).toBe(200);
  expect(response.body).toMatchSnapshot();

  const newMesuresCount1 = await getMesuresCount(1);
  const newMesuresCount2 = await getMesuresCount(2);

  // ensure mandataire posted on id=1 not id=2
  expect(newMesuresCount1).toBe(mesuresCount1 + 1);
  expect(newMesuresCount2).toBe(mesuresCount2);

  expect(nodemailerMock.mock.sentMail().length).toBe(0);
});

test("mandataire should NOT POST mesure for another one [body forge]", async () => {
  const token = await getTokenByUserType("mandataire");
  // when mandataire posts, only user.mandataire_id is used on the server as source of truth to post the mesure
  // when ti posts, we use body.mandataire_id
  // the only way to ensure mesures are affected is to test
  const mesuresCount1 = await getMesuresCount(1);
  const mesuresCount2 = await getMesuresCount(2);

  const response = await request(server)
    .post("/api/v1/mandataires/1/mesures")
    .set("Authorization", "Bearer " + token)
    .send({
      ...sampleMesure,
      mandataire_id: 2
    });

  expect(response.status).toBe(200);
  expect(response.body).toMatchSnapshot();

  const newMesuresCount1 = await getMesuresCount(1);
  const newMesuresCount2 = await getMesuresCount(2);

  // ensure mandataire posted on id=1 not id=2
  expect(newMesuresCount1).toBe(mesuresCount1 + 1);
  expect(newMesuresCount2).toBe(mesuresCount2);

  expect(nodemailerMock.mock.sentMail().length).toBe(0);
});

test("mandataire mesures count should be updated", async () => {
  const token = await getTokenByUserType("mandataire");

  const mesuresCounter = await getMesuresCounter(1);

  const response = await request(server)
    .post("/api/v1/mandataires/1/mesures")
    .set("Authorization", "Bearer " + token)
    .send(sampleMesure);

  expect(response.status).toBe(200);

  const newMesuresCounter = await getMesuresCounter(1);
  expect(newMesuresCounter).toBe(mesuresCounter + 1);

  expect(nodemailerMock.mock.sentMail().length).toBe(0);
});

test("TI should POST mesure and send email", async () => {
  const mesuresCount = (await knex("mesures").where({
    mandataire_id: 1
  })).length;

  const token = await getTokenByUserType("ti");
  const response = await request(server)
    .post("/api/v1/mandataires/1/mesures")
    .set("Authorization", "Bearer " + token)
    .send({
      ...sampleMesure,
      mandataire_id: 1
    });

  expect(response.status).toBe(200);

  const newMesuresCount = (await knex("mesures").where({
    mandataire_id: 1
  })).length;

  expect(newMesuresCount).toBe(mesuresCount + 1);

  expect(nodemailerMock.mock.sentMail().length).toBe(1);
  expect(nodemailerMock.mock.sentMail()).toMatchSnapshot();
});

test("TI should NOT POST mesure reservation for another TI mandataire", async () => {
  const mesuresCount = (await knex("mesures").where({
    mandataire_id: 3
  })).length;

  const token = await getTokenByUserType("ti");
  const response = await request(server)
    .post("/api/v1/mandataires/3/mesures")
    .set("Authorization", "Bearer " + token)
    .send({
      ...sampleMesure,
      mandataire_id: 3
    });

  expect(response.status).toBe(401);

  const newMesuresCount = (await knex("mesures").where({
    mandataire_id: 3
  })).length;

  expect(newMesuresCount).toBe(mesuresCount);

  expect(nodemailerMock.mock.sentMail().length).toBe(0);
});

test("TI should POST mesure-reservation", async () => {
  const mesuresCount = (await knex("mesures").where({
    mandataire_id: 1
  })).length;

  const token = await getTokenByUserType("ti");
  const response = await request(server)
    .post("/api/v1/mandataires/1/mesure-reservation")
    .set("Authorization", "Bearer " + token)
    .send({
      ...sampleMesure,
      mandataire_id: 1,
      ti_id: 1
    });

  expect(response.status).toBe(200);

  const newMesuresCount = (await knex("mesures").where({
    mandataire_id: 1
  })).length;

  expect(newMesuresCount).toBe(mesuresCount + 1);

  expect(nodemailerMock.mock.sentMail().length).toBe(0);
});

test("TI should NOT POST mesure-reservation for another TI mandataire", async () => {
  const mesuresCount = (await knex("mesures").where({
    mandataire_id: 3
  })).length;

  const token = await getTokenByUserType("ti");
  const response = await request(server)
    .post("/api/v1/mandataires/3/mesure-reservation")
    .set("Authorization", "Bearer " + token)
    .send({
      ...sampleMesure,
      mandataire_id: 3,
      ti_id: 1
    });

  expect(response.status).toBe(401);

  const newMesuresCount = (await knex("mesures").where({
    mandataire_id: 3
  })).length;

  expect(newMesuresCount).toBe(mesuresCount);

  expect(nodemailerMock.mock.sentMail().length).toBe(0);
});
