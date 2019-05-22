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

afterEach(async () => {
  // Remove all created mesures
  await knex("mesures")
    .whereNotBetween("id", [1, 5])
    .delete();
});

// strip the created_at date in the response
const simpler = ({ created_at, ...props }) => props;

test("should import mesures correctly", async () => {
  const token = await getTokenByUserType("mandataire");
  const response = await request(server)
    .post("/api/v1/mandataires/mesures/bulk")
    .set("Authorization", "Bearer " + token)
    .send({ sheetData: [1, 2] });
  expect(response.body).toMatchSnapshot({
    message: "2 Mesures importées."
  });
  expect(response.status).toBe(200);

  const mesures = await knex
    .from("mesures")
    .orderBy("id", "desc")
    .limit(2);

  expect(mesures.map(simpler)).toMatchSnapshot();
});

test("should skip existing references", async () => {
  const token = await getTokenByUserType("mandataire");

  const curMesures = await knex.from("mesures").where({ mandataire_id: 1 });
  expect(curMesures.length).toBe(4);

  {
    const response = await request(server)
      .post("/api/v1/mandataires/mesures/bulk")
      .set("Authorization", "Bearer " + token)
      .send({ sheetData: [{ numero_dossier: "abc" }] });

    expect(response.status).toBe(200);
    expect(response.body).toMatchSnapshot();

    const newMesures = await knex.from("mesures").where({ mandataire_id: 1 });
    expect(newMesures.length).toBe(5);
  }

  {
    const response = await request(server)
      .post("/api/v1/mandataires/mesures/bulk")
      .set("Authorization", "Bearer " + token)
      .send({ sheetData: [{ numero_dossier: "abc" }, { numero_dossier: "xyz" }]});

    expect(response.status).toBe(200);
    expect(response.body).toMatchSnapshot();

    const newMesures = await knex.from("mesures").where({ mandataire_id: 1 });
    expect(newMesures.length).toBe(6);
  }
});

//
