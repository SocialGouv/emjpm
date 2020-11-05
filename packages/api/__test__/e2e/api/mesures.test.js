const request = require("supertest");

const nodemailerMock = require("nodemailer-mock");

jest.setMock("nodemailer", nodemailerMock);

// Fake env
process.env.SMTP_FROM = "ne-pas-repondre@emjpm.gouv.fr";
process.env.APP_URL = "https://emjpm.gouv.fr";

const { databaseName, knex } = global;
jest.setMock("@emjpm/api/src/db/knex", knex);

const server = require("@emjpm/api/src/server");
const { seedData } = require("@emjpm/api/database/seed-data");

beforeAll(async () => {
  await seedData(databaseName);

  await knex("editors").insert({
    api_token: "api_token",
    name: "editor test",
    redirect_uris: JSON.stringify(["http://localhost:3001"]),
  });

  const [editor] = await knex("editors");
  const [ti] = await knex("tis").where({ id: 22 });
  const [user] = await knex("users").where({ type: "individuel" }).limit(1);
  const [mandataire] = await knex("mandataires")
    .where({ user_id: user.id })
    .limit(1);
  const [mesure] = await knex("mesures")
    .where({ mandataire_id: mandataire.id, status: "en_cours" })
    .limit(1);

  const loginRes = await request(server).post("/api/auth/login").send({
    password: "emjpm2019",
    username: user.username,
  });

  const loginToken = await loginRes.body.token;

  await request(server)
    .post("/api/oauth/authorize")
    .set({ Authorization: `Bearer ${loginToken}` })
    .set("Accept", "application/json")
    .send({
      access_token: loginToken,
      client_id: editor.id,
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
        etats: [
          {
            champ_mesure: "protection_bien",
            code_postal: "89000",
            date_changement_etat: "2020-01-05",
            lieu_vie: "domicile",
            nature_mesure: "curatelle_simple",
            pays: "FR",
            ville: "auxerre",
          },
          {
            champ_mesure: "protection_bien",
            code_postal: "89350",
            date_changement_etat: "2020-01-06",
            lieu_vie: "domicile",
            nature_mesure: "curatelle_simple",
            pays: "FR",
            ville: "perrigny",
          },
        ],
        numero_dossier: "45656456",
        numero_rg: "RG234534534",
        ressources: [],
        tribunal_cabinet: null,
        tribunal_siret: global.ti.siret,
      });
    // eslint-disable-next-line no-unused-vars
    const { id, ...expected } = response.body;
    expect(expected).toMatchSnapshot();
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
        etats: [
          {
            champ_mesure: "protection_bien",
            code_postal: "89000",
            date_changement_etat: "2020-01-05",
            lieu_vie: "domicile",
            nature_mesure: "curatelle_simple",
            pays: "FR",
            ville: "auxerre",
          },
        ],
        numero_dossier: "45656456",
        numero_rg: "RG234534534",
        ressources: [],
        tribunal_cabinet: null,
        tribunal_siret: global.ti.siret,
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
        etats: [
          {
            code_postal: "89000",
            date_changement_etat: "2020-01-05",
            lieu_vie: "domicile",
            nature_mesure: "curatelle_simple",
            pays: "FR",
            ville: "auxerre",
          },
          {
            code_postal: "89350",
            date_changement_etat: "2020-01-06",
            lieu_vie: "domicile",
            nature_mesure: "curatelle_simple",
            pays: "FR",
            ville: "perrigny",
          },
        ],
        numero_dossier: "45656456",
        numero_rg: "RG234534534",
        ressources: [],
        tribunal_cabinet: null,
        tribunal_siret: global.ti.siret,
      });
    // eslint-disable-next-line no-unused-vars
    const { id, ...expected } = response.body;
    expect(expected).toMatchSnapshot();
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
        etats: [
          {
            champ_mesure: "protection_bien",
            code_postal: "89000",
            date_changement_etat: "2020-03-05",
            lieu_vie: "domicile",
            nature_mesure: "curatelle_simple",
            pays: "FR",
            ville: "auxerre",
          },
          {
            champ_mesure: "protection_bien",
            code_postal: "89350",
            date_changement_etat: "2020-05-06",
            lieu_vie: "domicile",
            nature_mesure: "curatelle_simple",
            pays: "FR",
            ville: "perrigny",
          },
        ],
        numero_dossier: "45656456",
        numero_rg: "RG234534534",
        ressources: [
          {
            annee: 2020,
            niveau_ressource: 14246,
            prestations_sociales: ["AAH"],
          },
        ],
        tribunal_cabinet: null,
        tribunal_siret: global.ti.siret,
      });

    // eslint-disable-next-line no-unused-vars
    const { created_at, id, ...expected } = response.body;
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
          lieu_vie: "domicile",
          nature_mesure: "curatelle_simple",
          pays: "FR",
          type_etablissement: null,
          ville: "perrigny",
        },
      ],
      latitude: 47.78,
      longitude: 3.07776,
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
      tribunal_siret: "17750111101763",
    });
    expect(response.status).toBe(201);
  });
});

describe("POST /api/editors/mesures/batch", () => {
  test("it returns 201", async () => {
    const response = await request(server)
      .post("/api/editors/mesures/batch")
      .set("Accept", "application/json")
      .set({ Authorization: `Bearer ${global.token}` })
      .send({
        mesures: [
          {
            annee_naissance: 1957,
            civilite: "monsieur",
            date_nomination: "2019-02-14",
            date_premier_mesure: "2019-02-14",
            date_protection_en_cours: "2019-04-18",
            etats: [
              {
                champ_mesure: "protection_bien_personne",
                code_postal: "22190",
                date_changement_etat: "2020-09-19",
                lieu_vie: "domicile",
                nature_mesure: "curatelle_simple",
                pays: "FR",
                type_etablissement: "etablissement_handicapes",
                ville: "PLRIN SUR MER",
              },
            ],
            numero_dossier: "TESTES",
            numero_rg: "2020202020",
            ressources: [
              {
                annee: 2019,
                niveau_ressource: 14246,
                prestations_sociales: [],
              },
            ],
            tribunal_siret: "17750111101763",
          },
          {
            annee_naissance: 1982,
            civilite: "monsieur",
            date_nomination: "2018-02-01",
            date_premier_mesure: "2014-01-01",
            date_protection_en_cours: "2020-05-12",
            etats: [
              {
                champ_mesure: "protection_bien_personne",
                code_postal: "22190",
                date_changement_etat: "2020-05-12",
                lieu_vie: "etablissement",
                nature_mesure: "curatelle_renforcee",
                pays: "FR",
                type_etablissement: "autre_etablissement_s_ms",
                ville: "PLRIN SUR MER",
              },
              {
                champ_mesure: "protection_bien_personne",
                code_postal: "75005",
                date_changement_etat: "2019-09-19",
                lieu_vie: "domicile",
                nature_mesure: "curatelle_simple",
                pays: "FR",
                ville: "PARIS",
              },
              {
                champ_mesure: "protection_personne",
                code_postal: "75005",
                date_changement_etat: "2018-02-01",
                lieu_vie: "domicile",
                nature_mesure: "curatelle_simple",
                pays: "FR",
                ville: "PARIS",
              },
            ],
            numero_dossier: "20190512",
            numero_rg: "18/A/3245",
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
            tribunal_siret: "17750111101763",
          },
        ],
      });

    expect(response.status).toBe(201);
    const { mesures } = response.body;
    const expected = mesures.map((mesure) => {
      // eslint-disable-next-line no-unused-vars
      const { created_at, id, ...expected } = mesure;
      return expected;
    });
    expect({ mesures: expected }).toMatchSnapshot();
  });
});

describe("DELETE /api/editors/mesures/:id", () => {
  test("it returns 201", async () => {
    const response = await request(server)
      .delete(`/api/editors/mesures/${global.mesure.id}`)
      .set("Accept", "application/json")
      .set({ Authorization: `Bearer ${global.token}` });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ affected_rows: 1 });
  });
});
