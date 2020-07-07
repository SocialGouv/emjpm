const request = require("supertest");

const nodemailerMock = require("nodemailer-mock");
jest.setMock("nodemailer", nodemailerMock);

// Fake env
process.env.SMTP_FROM = "ne-pas-repondre@emjpm.gouv.fr";
process.env.APP_URL = "https://emjpm.gouv.fr";

const { knex } = global;
jest.setMock("@emjpm/api/src/db/knex", knex);

const server = require("@emjpm/api/src/server");

beforeAll(async () => {
  await knex.migrate.latest();
  await knex.seed.run();

  const [editor] = await knex("editors");
  const [ti] = await knex("tis");
  const [user] = await knex("users");
  const [mesure] = await knex("mesures");

  await request(server).post("/api/auth/login").send({
    username: user.username,
    password: "johnson123",
  });

  const res = await request(server).post("/api/oauth/authorize").send({
    userId: user.id,
    editorId: editor.id,
    editorToken: editor.api_token,
    redirectUrl: "http://localhost:3001",
  });

  const {
    body: { publicToken },
  } = res;

  global.token = publicToken;
  global.user = user;
  global.ti = ti;
  global.mesure = mesure;
});

describe("GET /api/editors/mesures", () => {
  describe("when public token is invalid", () => {
    test("it returns 401", async () => {
      const response = await request(server)
        .get("/api/editors/mesures")
        .set("Accept", "application/json")
        .set({ Authorization: `Bearer invalid` });

      expect(response.status).toBe(401);
    });
  });

  test("it returns 200", async () => {
    const response = await request(server)
      .get("/api/editors/mesures")
      .set("Accept", "application/json")
      .set({ Authorization: `Bearer ${global.token}` });

    expect(response.status).toBe(200);
  });
});

describe("POST /api/editors/mesures", () => {
  describe("when params are invalid", () => {
    test("it returns 422 with errors", async () => {
      const response = await request(server)
        .post("/api/editors/mesures")
        .set("Accept", "application/json")
        .set({ Authorization: `Bearer ${global.token}` })
        .send({});

      expect(response.body.errors).toBeTruthy();
      expect(response.status).toBe(422);
    });
  });

  test("it returns 201", async () => {
    // TODO(plaunay): move payload to proper fixture
    const response = await request(server)
      .post("/api/editors/mesures")
      .set("Accept", "application/json")
      .set({ Authorization: `Bearer ${global.token}` })
      .send({
        annee_naissance: "1983",
        antenne_id: null,
        civilite: "H",
        code_postal: "75015",
        ville: "paris",
        latitude: "45.8383",
        longitude: "1.01181",
        date_nomination: "2020-02-20",
        department_id: "75",
        numero_dossier: "123123123",
        numero_rg: "RGXXXX123",
        lieu_vie: "etablissement",
        ti_id: global.ti.id,
        type: "curatelle renforcée aux biens et à la personne",
      });

    expect(response.status).toBe(201);
  });
});

describe("PUT /api/editors/mesures", () => {
  test("it returns 200", async () => {
    // TODO(plaunay): move payload to proper fixture
    const response = await request(server)
      .put(`/api/editors/mesures/${global.mesure.id}`)
      .set("Accept", "application/json")
      .set({ Authorization: `Bearer ${global.token}` })
      .send({ annee_naissance: "1983" });
    expect(response.status).toBe(200);
  });
});

describe("POST /api/editors/mesures/batch", () => {
  test("it returns 201", async () => {
    // TODO(plaunay): move payload to proper fixture
    const response = await request(server)
      .post("/api/editors/mesures/batch")
      .set("Accept", "application/json")
      .set({ Authorization: `Bearer ${global.token}` })
      .send({
        mesures: [
          {
            annee_naissance: "1983",
            antenne_id: null,
            civilite: "H",
            code_postal: "75015",
            ville: "paris",
            latitude: "45.8383",
            longitude: "1.01181",
            date_nomination: "2020-02-20",
            department_id: "75",
            numero_dossier: "123123123",
            numero_rg: "RGXXXX123",
            lieu_vie: "etablissement",
            ti_id: global.ti.id,
            type: "curatelle renforcée aux biens et à la personne",
          },
        ],
      });

    expect(response.status).toBe(201);
  });
});

describe("DELETE /api/editors/mesures/:id", () => {
  test("it returns 201", async () => {
    // TODO(plaunay): move payload to proper fixture
    const response = await request(server)
      .delete(`/api/editors/mesures/${global.mesure.id}`)
      .set("Accept", "application/json")
      .set({ Authorization: `Bearer ${global.token}` });

    expect(response.status).toBe(204);
  });
});
