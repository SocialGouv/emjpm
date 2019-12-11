//

const request = require("supertest");
const nodemailerMock = require("nodemailer-mock");
jest.setMock("nodemailer", nodemailerMock);

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
});

beforeEach(async () => {
  nodemailerMock.mock.reset();
  // ! FUTURE(douglasduteil): only seed once and clean up mutations in afterEach !
  // ! It's too hard to clean up mutations now...
  // ! But one day we will have to do it...
  await knex.seed.run();
});

// eslint-disable-next-line no-unused-vars
const simplerMesure = ({ id, ...props }) => props;

const getMesuresCount = async mandataire_id =>
  (await knex("mesures").where({
    mandataire_id
  })).length;

test("mandataire should POST mesure", async () => {
  const token = await getTokenByUserType("mandataire");
  const response = await request(server)
    .post("/api/v1/mandataires/1/mesures")
    .set("Authorization", "Bearer " + token)
    .send(sampleMesure);

  expect(response.body.map(simplerMesure)).toMatchSnapshot();
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

  expect(response.body.map(simplerMesure)).toMatchSnapshot();
  expect(response.status).toBe(200);

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
      mandataire_id: 1
    });

  expect(response.body.map(simplerMesure)).toMatchSnapshot();
  expect(response.status).toBe(200);

  const newMesuresCount1 = await getMesuresCount(1);
  const newMesuresCount2 = await getMesuresCount(2);

  // ensure mandataire posted on id=1 not id=2
  expect(newMesuresCount1).toBe(mesuresCount1 + 1);
  expect(newMesuresCount2).toBe(mesuresCount2);

  expect(nodemailerMock.mock.sentMail().length).toBe(0);
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

  expect(response.body).toMatchInlineSnapshot(
    { stack: expect.any(String) },
    `
Object {
  "message": "Mandataire not found",
  "name": "UnauthorizedError",
  "stack": Any<String>,
  "status": 401,
}
`
  );
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

  expect(response.body).toMatchSnapshot();
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

  expect(response.body).toMatchInlineSnapshot(
    { stack: expect.any(String) },
    `
Object {
  "message": "Mandataire not found",
  "name": "UnauthorizedError",
  "stack": Any<String>,
  "status": 401,
}
`
  );
  expect(response.status).toBe(401);

  const newMesuresCount = (await knex("mesures").where({
    mandataire_id: 3
  })).length;

  expect(newMesuresCount).toBe(mesuresCount);

  expect(nodemailerMock.mock.sentMail().length).toBe(0);
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
  status: "Mesure en cours",
  mandataire_id: 1
};

//
