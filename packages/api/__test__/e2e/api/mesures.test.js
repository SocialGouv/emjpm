const request = require("supertest");

const nodemailerMock = require("nodemailer-mock");
jest.setMock("nodemailer", nodemailerMock);

// Fake env
process.env.SMTP_FROM = "ne-pas-repondre@emjpm.gouv.fr";
process.env.APP_URL = "https://emjpm.gouv.fr";

const { knex } = global;
jest.setMock("@emjpm/api/src/db/knex", knex);

const server = require("@emjpm/api/src/server");
const seedData = require("../../database/seed-data");

beforeAll(async () => {
  await seedData(databaseName);

  const [editor] = await knex("editors");
  const [ti] = await knex("tis");
  const [user] = await knex("users");
  const [mesure] = await knex("mesures");

  const loginRes = await request(server).post("/api/auth/login").send({
    username: user.username,
    password: "johnson123",
  });

  const loginToken = await loginRes.body.token;

  await request(server)
    .post("/api/oauth/authorize")
    .set({ Authorization: `Bearer ${loginToken}` })
    .set("Accept", "application/json")
    .send({
      client_id: editor.id,
      redirect_uri: "http://localhost:3001",
      access_token: loginToken,
      state: "api-test",
      response_type: "code",
    });

  const authorizationCode = await knex("authorization_codes").first();

  const res = await request(server)
    .post("/api/oauth/token")
    .send(`client_id=${authorizationCode.client_id}`)
    .send(`redirect_uri=${authorizationCode.redirect_uri}`)
    .send(`code=${authorizationCode.code}`)
    .send(`client_secret=test-token`)
    .send(`grant_type=authorization_code`);

  global.token = res.body.access_token;
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
        ressources: [
          {
            annee: 2020,
            niveau_ressource: 14246,
            prestations_sociales: ["AAH"],
          },
        ],
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
      annee_naissance: 1989,
      antenne_id: null,
      cause_sortie: "dessaisissement_famille",
      civilite: "monsieur",
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
          lieu_vie: "domicile",
          nature_mesure: "curatelle_simple",
          pays: "FR",
          type_etablissement: null,
          ville: "perrigny",
        },
      ],
      id: 6,
      latitude: null,
      longitude: null,
      numero_dossier: "45656456",
      numero_rg: "RG234534534",
      ressources: [
        {
          annee: 2020,
          niveau_ressource: 14246,
          prestations_sociales: ["AAH"],
        },
      ],
      resultat_revision: null,
      tribunal_siret: "17590111501251",
    });
    expect(response.status).toBe(201);
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
            numero_rg: "2020202020",
            numero_dossier: "TESTES",
            annee_naissance: 1957,
            civilite: "monsieur",
            date_premier_mesure: "2019-02-14",
            date_nomination: "2019-02-14",
            date_protection_en_cours: "2019-04-18",
            tribunal_siret: "17590111501251",
            etats: [
              {
                date_changement_etat: "2020-09-19",
                nature_mesure: "curatelle_simple",
                champ_mesure: "protection_bien_personne",
                lieu_vie: "domicile",
                code_postal: "22190",
                ville: "PLRIN SUR MER",
                pays: "FR",
                type_etablissement: "etablissement_handicapes",
              },
            ],
            ressources: [
              {
                annee: 2019,
                niveau_ressource: 14246,
                prestations_sociales: [],
              },
            ],
          },
          {
            numero_rg: "18/A/3245",
            numero_dossier: "20190512",
            annee_naissance: 1982,
            civilite: "monsieur",
            date_premier_mesure: "2014-01-01",
            date_nomination: "2018-02-01",
            date_protection_en_cours: "2020-05-12",
            tribunal_siret: "17590111501251",
            etats: [
              {
                date_changement_etat: "2020-05-12",
                nature_mesure: "curatelle_renforcee",
                champ_mesure: "protection_bien_personne",
                lieu_vie: "etablissement",
                code_postal: "22190",
                ville: "PLRIN SUR MER",
                pays: "FR",
                type_etablissement: "autre_etablissement_s_ms",
              },
              {
                date_changement_etat: "2019-09-19",
                nature_mesure: "curatelle_simple",
                champ_mesure: "protection_bien_personne",
                lieu_vie: "domicile",
                code_postal: "75005",
                ville: "PARIS",
                pays: "FR",
              },
              {
                date_changement_etat: "2018-02-01",
                nature_mesure: "curatelle_simple",
                champ_mesure: "protection_personne",
                lieu_vie: "domicile",
                code_postal: "75005",
                ville: "PARIS",
                pays: "FR",
              },
            ],
            ressources: [
              {
                annee: 2020,
                niveau_ressource: 25000,
                prestations_sociales: [],
              },
              {
                annee: 2019,
                niveau_ressource: 28000,
                prestations_sociales: [],
              },
              {
                annee: 2018,
                niveau_ressource: 30000,
                prestations_sociales: [],
              },
            ],
          },
        ],
      });

    expect(response.status).toBe(201);
    const { mesures } = response.body;
    const expected = mesures.map((mesure) => {
      // eslint-disable-next-line no-unused-vars
      const { created_at, ...expected } = mesure;
      return expected;
    });
    expect({ mesures: expected }).toMatchSnapshot();
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
