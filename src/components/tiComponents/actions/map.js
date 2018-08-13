import apiFetch from "../../communComponents/Api";

export const MANDATAIRES_UPDATED = "MANDATAIRES_UPDATED";
export const MESURES_SHOW = "MESURES_SHOW";
/* ---------- API */

/* ---------- ACTIONS CREATORS */

/* ----------- PLAIN ACTIONS  */

export const mandatairesUpdated = data => ({
  type: MANDATAIRES_UPDATED,
  data
});

export const mesuresShow = data => ({
  type: MESURES_SHOW,
  data
});
