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

test("should import mesures correctly", async () => {
  const token = await getTokenByUserType("mandataire");
  const response = await request(server)
    .post("/api/v1/mandataires/mesures/bulk")
    .set("Authorization", "Bearer " + token)
    .send([1, 2]);
  expect(response.body).toMatchSnapshot({
    added: 2,
    message: "2 Mesures importées.",
    success: true
  });
  expect(response.status).toBe(200);

  const mesures = await knex
    .from("mesures")
    .orderBy("id", "desc")
    .limit(2);
  expect(mesures[0].mandataire_id).toBe(1);
  expect(mesures[0].status).toBe("Mesure en cours");
  expect(mesures[1].mandataire_id).toBe(1);
  expect(mesures[1].status).toBe("Mesure en cours");
});

test("should skip existing references", async () => {
  const token = await getTokenByUserType("mandataire");
  const curMesures = await knex.from("mesures").where({ mandataire_id: 1 });
  expect(curMesures.length).toBe(3);
  const response = await request(server)
    .post("/api/v1/mandataires/mesures/bulk")
    .set("Authorization", "Bearer " + token)
    .send([{ numero_dossier: "abc" }]);
  expect(response.status).toBe(200);
  //expect(response.body.length).toBe(4);
  const newMesures = await knex.from("mesures").where({ mandataire_id: 1 });
  expect(newMesures.length).toBe(4);
  const response2 = await request(server)
    .post("/api/v1/mandataires/mesures/bulk")
    .set("Authorization", "Bearer " + token)
    .send([{ numero_dossier: "abc" }, { numero_dossier: "xyz" }]);
  expect(response2.status).toBe(200);
  expect(response2.body).toMatchSnapshot({
    added: 1,
    message: expect.any(String),
    success: true
  });
  const newMesures2 = await knex.from("mesures").where({ mandataire_id: 1 });
  expect(newMesures2.length).toBe(5);
});

//
