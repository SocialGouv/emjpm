const request = require("supertest");
const { seedData } = require("../../database/seed-data");

const { databaseName, knex } = global;
jest.setMock("@emjpm/api/src/db/knex", knex);

const server = require("@emjpm/api/src/server");

beforeAll(async () => {
  await seedData(databaseName);
  await knex("editors").insert({
    api_token: "api_token",
    name: "editor test",
    redirect_uris: JSON.stringify(["http://localhost:3001"]),
  });
  const [editor] = await knex("editors");
  global.editor = editor;
});

beforeEach(async () => {
  await knex("authorization_codes").del();
});

async function getUserToken(user) {
  const loginRes = await request(server).post("/api/auth/login").send({
    password: "emjpm2019",
    username: user.username,
  });

  const loginToken = loginRes.body.token;

  await request(server)
    .post("/api/oauth/authorize")
    .set({ Authorization: `Bearer ${loginToken}` })
    .set("Accept", "application/json")
    .send({
      access_token: loginToken,
      client_id: global.editor.id,
      redirect_uri: "http://localhost:3001",
      response_type: "code",
      state: "api-test",
    });

  const authorizationCode = await knex("authorization_codes").first();

  const res = await request(server)
    .post("/api/oauth/token")
    .send(`client_id=${authorizationCode.client_id}`)
    .send(`redirect_uri=${authorizationCode.redirect_uri}`)
    .send(`code=${authorizationCode.code}`)
    .send(`client_secret=test-token`)
    .send(`grant_type=authorization_code`);

  return res.body.access_token;
}

describe("POST /api/mandoline/user", () => {
  describe("with user of type direction", () => {
    test("it returns expected user data", async () => {
      const [user] = await knex("users").where({ type: "direction" }).limit(1);
      const token = await getUserToken(user);

      const response = await request(server)
        .get("/api/mandoline/user")
        .set("Accept", "application/json")
        .set({ Authorization: `Bearer ${token}` });

      expect(response.body).toMatchObject({
        direction: {
          departement: { code: "75", nom: "Paris" },
          type: "departemental",
        },
        email: "direction-979@justice.fr",
        id: 979,
        nom: "direction",
        prenom: "Paula",
        type: "direction",
      });
    });
  });
  describe("with user of type service", () => {
    test("it returns expected user data", async () => {
      const [user] = await knex("users").where({ type: "service" }).limit(1);
      const token = await getUserToken(user);

      const response = await request(server)
        .get("/api/mandoline/user")
        .set("Accept", "application/json")
        .set({ Authorization: `Bearer ${token}` });

      expect(response.body).toMatchObject({
        email: "service-2042@justice.fr",
        id: 2042,
        nom: "service",
        prenom: "Paula",
        service: {
          departement: { code: "75", nom: "Paris" },
          dispo_max: 325,
          email: "service-50@justice.fr",
          etablissement: "service-50",
          lb_adresse: "Rue du service tutelaire",
          lb_code_postal: "75010",
          lb_ville: "Paris",
          mesures_en_attente: 330,
          mesures_en_cours: 0,
          nom: null,
          org_adresse: "Rue de l'organisme gestionnaire",
          org_code_postal: null,
          org_gestionnaire: null,
          org_nom: "Organisme gestionnaire",
          org_ville: null,
          prenom: null,
          siret: null,
          telephone: "0140506070",
        },
        type: "service",
      });
    });
  });
});
