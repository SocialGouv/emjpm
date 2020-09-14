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

  test("it return date_nomination error", async () => {
    const response = await request(server)
      .post("/api/editors/mesures")
      .set("Accept", "application/json")
      .set({ Authorization: `Bearer ${global.token}` })
      .send({
        annee_naissance: 1989,
        antenne_id: null,
        cause_sortie: "dessaisissement_famille",
        civilite: "monsieur",
        date_fin_mesure: "2020-04-04",
        date_nomination: "2020-01-01",
        date_premier_mesure: "2020-01-05",
        date_protection_en_cours: "2020-01-10",
        numero_dossier: "45656456",
        numero_rg: "RG234534534",
        tribunal_siret: global.ti.siret,
        tribunal_cabinet: null,
        ressources: [],
        etats: [
          {
            champ_mesure: "protection_bien",
            date_changement_etat: "2020-01-05",
            lieu_vie: "domicile",
            pays: "FR",
            nature_mesure: "curatelle_simple",
            code_postal: "89000",
            ville: "auxerre",
          },
          {
            champ_mesure: "protection_bien",
            date_changement_etat: "2020-01-06",
            lieu_vie: "domicile",
            pays: "FR",
            nature_mesure: "curatelle_simple",
            code_postal: "89350",
            ville: "perrigny",
          },
        ],
      });
    expect(response.body).toMatchSnapshot();
    expect(response.status).toBe(422);
  });

  test("it returns date_nomination error", async () => {
    const response = await request(server)
      .post("/api/editors/mesures")
      .set("Accept", "application/json")
      .set({ Authorization: `Bearer ${global.token}` })
      .send({
        annee_naissance: 1989,
        antenne_id: null,
        cause_sortie: "dessaisissement_famille",
        civilite: "monsieur",
        date_fin_mesure: "2020-04-04",
        date_nomination: "2020-01-11",
        date_premier_mesure: "2020-01-10",
        date_protection_en_cours: "2020-01-10",
        numero_dossier: "45656456",
        numero_rg: "RG234534534",
        tribunal_siret: global.ti.siret,
        tribunal_cabinet: null,
        ressources: [],
        etats: [
          {
            date_changement_etat: "2020-01-05",
            lieu_vie: "domicile",
            pays: "FR",
            nature_mesure: "curatelle_simple",
            code_postal: "89000",
            ville: "auxerre",
            champ_mesure: "protection_bien",
          },
        ],
      });

    expect(response.body).toEqual({
      errors: [
        {
          location: "body",
          msg:
            "date_nomination must be before or equivalent to date_protection_en_cours",
          param: "date_nomination",
          value: "2020-01-11",
        },
      ],
    });
    expect(response.status).toBe(422);
  });

  test("it returns date_protection_en_cours error", async () => {
    const response = await request(server)
      .post("/api/editors/mesures")
      .set("Accept", "application/json")
      .set({ Authorization: `Bearer ${global.token}` })
      .send({
        annee_naissance: 1989,
        antenne_id: null,
        cause_sortie: "dessaisissement_famille",
        civilite: "monsieur",
        date_fin_mesure: "2020-04-04",
        date_nomination: "2020-01-11",
        date_premier_mesure: "2020-01-10",
        date_protection_en_cours: "2020-01-10",
        numero_dossier: "45656456",
        numero_rg: "RG234534534",
        tribunal_siret: global.ti.siret,
        tribunal_cabinet: null,
        ressources: [],
        etats: [
          {
            date_changement_etat: "2020-01-05",
            lieu_vie: "domicile",
            pays: "FR",
            nature_mesure: "curatelle_simple",
            code_postal: "89000",
            ville: "auxerre",
          },
          {
            date_changement_etat: "2020-01-06",
            lieu_vie: "domicile",
            pays: "FR",
            nature_mesure: "curatelle_simple",
            code_postal: "89350",
            ville: "perrigny",
          },
        ],
      });
    expect(response.body).toMatchSnapshot();
    expect(response.status).toBe(422);
  });

  test("it returns 201", async () => {
    const response = await request(server)
      .post("/api/editors/mesures")
      .set("Accept", "application/json")
      .set({ Authorization: `Bearer ${global.token}` })
      .send({
        annee_naissance: 1989,
        antenne_id: null,
        cause_sortie: "dessaisissement_famille",
        civilite: "monsieur",
        date_fin_mesure: "2020-04-04",
        date_nomination: "2020-01-11",
        date_premier_mesure: "2020-01-10",
        date_protection_en_cours: "2020-01-11",
        numero_dossier: "45656456",
        numero_rg: "RG234534534",
        tribunal_siret: global.ti.siret,
        tribunal_cabinet: null,
        ressources: [],
        etats: [
          {
            champ_mesure: "protection_bien",
            date_changement_etat: "2020-03-05",
            lieu_vie: "domicile",
            pays: "FR",
            nature_mesure: "curatelle_simple",
            code_postal: "89000",
            ville: "auxerre",
          },
          {
            champ_mesure: "protection_bien",
            date_changement_etat: "2020-05-06",
            lieu_vie: "domicile",
            pays: "FR",
            nature_mesure: "curatelle_simple",
            code_postal: "89350",
            ville: "perrigny",
          },
        ],
      });

    // eslint-disable-next-line no-unused-vars
    const { created_at, ...expected } = response.body;
    expect(expected).toEqual({
      annee_naissance: "1989",
      antenne_id: null,
      cause_sortie: "dessaisissement_famille",
      civilite: "monsieur",
      code_postal: "89350",
      date_fin_mesure: "2020-04-04",
      date_nomination: "2020-01-11",
      date_premier_mesure: "2020-01-10",
      date_protection_en_cours: "2020-01-11",
      etats: [
        {
          champ_mesure: "protection_bien",
          code_postal: "89000",
          date_changement_etat: "2020-03-05",
          etablissement_siret: "",
          id: 1,
          lieu_vie: "domicile",
          nature_mesure: "curatelle_simple",
          pays: "FR",
          type_etablissement: null,
          ville: "auxerre",
        },
        {
          champ_mesure: "protection_bien",
          code_postal: "89350",
          date_changement_etat: "2020-05-06",
          etablissement_siret: "",
          id: 2,
          lieu_vie: "domicile",
          nature_mesure: "curatelle_simple",
          pays: "FR",
          type_etablissement: null,
          ville: "perrigny",
        },
      ],
      id: 6,
      latitude: null,
      lieu_vie: "domicile",
      longitude: null,
      numero_dossier: "45656456",
      numero_rg: "RG234534534",
      pays: "FR",
      ressources: [],
      resultat_revision: null,
      type_etablissement: null,
      ville: "perrigny",
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
            annee_naissance: 1989,
            antenne_id: null,
            cause_sortie: "dessaisissement_famille",
            civilite: "monsieur",
            date_fin_mesure: "2020-04-04",
            date_nomination: "2020-01-01",
            date_premier_mesure: "2020-01-10",
            date_protection_en_cours: "2020-01-10",
            numero_dossier: "45656456",
            numero_rg: "RG234534534",
            tribunal_siret: "17590111501251",
            tribunal_cabinet: null,
            etats: [
              {
                date_changement_etat: "2020-01-08",
                lieu_vie: "domicile",
                pays: "FR",
                nature_mesure: "curatelle_simple",
                code_postal: "89000",
                ville: "AUXERRE",
              },
            ],
            ressources: [
              {
                annee: 2010,
                niveau_ressource: 300,
                prestations_sociales: ["PCH", "RSA"],
              },
            ],
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

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ affected_rows: 1 });
  });
});
