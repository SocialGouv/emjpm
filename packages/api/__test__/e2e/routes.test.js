const { shouldBeProtected } = require("./utils");

const accessChecks = [
  {
    method: "PUT",
    url: "/api/v1/mandataires/1/mesures/1",
    type: ["mandataire", "ti"]
  },

  {
    method: "POST",
    url: "/api/v1/mandataires/1/mesure-reservation",
    type: ["ti"]
  },

  {
    method: "POST",
    url: "/api/v1/mandataires/1/mesures",
    type: ["mandataire", "ti"]
  },

  { method: "DELETE", url: "/api/v1/mandataires/1/commentaires/1", type: "ti" },

  { method: "GET", url: "/api/v1/mandataires/1/commentaires", type: "ti" },

  { method: "POST", url: "/api/v1/mandataires/1/commentaires", type: "ti" },

  {
    method: "POST",
    url: "/api/v1/mandataires/mesures/bulk",
    type: "mandataire"
  },

  { method: "GET", url: "/api/v1/mandataires/1/mesures", type: "mandataire" },

  {
    method: "GET",
    url: "/api/v1/mandataires/1/mesuresForMaps",
    type: "mandataire"
  },

  {
    method: "GET",
    url: "/api/v1/mandataires/1/mesures/attente",
    type: "mandataire"
  },

  {
    method: "GET",
    url: "/api/v1/mandataires/1/mesures/Eteinte",
    type: "mandataire"
  }
];

accessChecks.forEach(access =>
  shouldBeProtected(access.method, access.url, { type: access.type })
);
