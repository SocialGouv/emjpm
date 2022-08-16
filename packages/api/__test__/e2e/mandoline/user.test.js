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
    email: user.email,
    password: "emjpm2021",
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
    .send(`client_secret=api_token`)
    .send(`redirect_uri=${authorizationCode.redirect_uri}`)
    .send(`code=${authorizationCode.code}`)
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
          type: "departemental",
        },
        email: "aurore.weitz@bas-rhin.gouv.fr",
        id: 15,
        nom: "WEITZ",
        prenom: "Aurore",
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
        email: "maelys.dupuis@atn.fr",
        id: 25,
        nom: "DUPUIS",
        prenom: "Maelys ",
        service: {
          adresse: "10 Rue de la Ville En Pierre",
          code_postal: "44000",
          departement: { code: "44", nom: "Loire-Atlantique" },
          departements: [{ code: "44", nom: "Loire-Atlantique" }],
          dispo_max: 900,
          email: "atn@justice.fr",
          etablissement: "ATN",
          mesures_en_attente: 1,
          mesures_en_cours: 3,
          nom: "ARISTILE",
          org_adresse: "",
          org_code_postal: "",
          org_gestionnaire: false,
          org_nom: "",
          org_ville: "",
          prenom: "Elise",
          siret: "75572248413489",
          telephone: "01 10 10 10 10 ",
          ville: "Nantes",
        },
        type: "service",
      });
    });
  });
});
