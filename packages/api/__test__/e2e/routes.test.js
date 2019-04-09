const { knex } = global;
jest.setMock("@emjpm/api/db/knex", knex);

const { shouldBeProtected } = require("./utils");

//

beforeAll(async () => {
  await knex.migrate.latest();
  await knex.seed.run();
});

const accessChecks = [
  {
    method: "GET",
    url: "/api/v1/admin/mandataires",
    type: "admin"
  },
  {
    method: "GET",
    url: "/api/v1/admin/tis",
    type: "admin"
  },
  {
    method: "PUT",
    url: "/api/v1/admin/user/1",
    type: "admin"
  },
  {
    method: "GET",
    url: "/api/v1/mandataires",
    type: "ti"
  },
  {
    method: "GET",
    url: "/api/v1/mandataires/1",
    type: ["mandataire", "service"]
  },
  {
    method: "PUT",
    url: "/api/v1/mandataires/1",
    type: ["mandataire", "service"]
  },
  {
    method: "PUT",
    url: "/api/v1/mandataires/1/capacite",
    type: ["mandataire", "service"]
  },
  {
    method: "GET",
    url: "/api/v1/mandataires/1/commentaires",
    type: "ti"
  },
  {
    method: "POST",
    url: "/api/v1/mandataires/1/commentaires",
    type: "ti"
  },
  {
    method: "DELETE",
    url: "/api/v1/mandataires/1/commentaires/1",
    type: "ti"
  },
  {
    method: "GET",
    url: "/api/v1/mandataires/service",
    type: ["service"]
  },
  {
    method: "POST",
    url: "/api/v1/mandataires/1/mesure-reservation",
    type: ["ti"]
  },
  {
    method: "POST",
    url: "/api/v1/mandataires/1/mesures",
    type: ["mandataire", "ti", "service"]
  },
  {
    method: "GET",
    url: "/api/v1/mandataires/1/mesures",
    type: ["mandataire", "service"]
  },
  {
    method: "PUT",
    url: "/api/v1/mandataires/1/mesures-en-attente",
    type: ["mandataire", "ti", "service"]
  },
  {
    method: "PUT",
    url: "/api/v1/mandataires/1/mesures/1",
    type: ["mandataire", "ti", "service"]
  },
  {
    method: "GET",
    url: "/api/v1/mandataires/1/mesures/Eteinte",
    type: ["mandataire", "service"]
  },
  {
    method: "GET",
    url: "/api/v1/mandataires/1/mesures/attente",
    type: ["mandataire", "service"]
  },
  {
    method: "POST",
    url: "/api/v1/mandataires/filters",
    type: "ti"
  },
  {
    method: "POST",
    url: "/api/v1/mandataires/mesures/bulk",
    type: ["mandataire", "service"]
  },
  {
    method: "GET",
    url: "/api/v1/mandataires/services",
    type: "ti"
  },
  {
    method: "GET",
    url: "/api/v1/mandataires/services",
    type: "ti"
  },
  {
    method: "GET",
    url: "/api/v1/mesures",
    type: "ti"
  },
  {
    method: "GET",
    url: "/api/v1/mesures/getAllMesuresByTis",
    type: "ti"
  },
  {
    method: "GET",
    url: "/api/v1/mesures/popup",
    type: "ti"
  }
];

accessChecks.forEach(access =>
  shouldBeProtected(access.method, access.url, { type: access.type })
);
