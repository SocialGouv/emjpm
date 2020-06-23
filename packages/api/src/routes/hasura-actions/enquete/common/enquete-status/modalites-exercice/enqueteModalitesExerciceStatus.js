const {
  getValidationStatus,
  getGlobalStatus,
} = require("../enqueteSchemaUtil");
const yup = require("yup");
const { ENQ_REP_MODALITE_EXERCICE } = require("../../constants");

const debugGroupName = "modalitesExercice";

module.exports = async (enqueteReponse) => {
  // IMPORTANT: construire les status dans l'ordre d'affichage car un statut "empty" devient "invalid" si au moins un onglet précédent a été renseigné
  const informationsGenerales = await getValidationStatus(
    enqueteReponse.enquete_reponses_modalites_exercice,
    {
      schema: yup.object().shape({
        departement: yup.string().required(),
        region: yup.string().required(),
        raison_sociale: yup.string().required(),
        personnalite_juridique_etablissement: yup.string().required(),
        activite_exercee_par: yup
          .mixed()
          .oneOf(ENQ_REP_MODALITE_EXERCICE.ACTIVE_EXERCEE_PAR.keys)
          .required(),
        etablissements_type: yup
          .mixed()
          .oneOf(ENQ_REP_MODALITE_EXERCICE.ETABLISSEMENTS_TYPE.keys)
          .required(),
        total_mesures_etablissements: yup.number().min(0).required(),
      }),
      debugName: `${debugGroupName}/informationsGenerales`,
      logDataWithErrors: false,
    }
  );
  const etablissements = await getValidationStatus(
    enqueteReponse.enquete_reponses_modalites_exercice,
    {
      schema: yup.object().shape({
        nombre_lits_journee_hospitalisation: yup.array().of(
          yup.object().shape({
            finess: yup.string().required(),
            nombre_journees_hospitalisation: yup.number().min(0).required(),
            nombre_lits: yup.number().min(0).required(),
            raison_sociale: yup.string().required(),
            statut: yup.string().required(),
            type: yup.string().required(),
            nombre_journees_esms: yup.number().min(0).required(),
            nombre_mesures: yup.number().min(0).required(),
          })
        ),
      }),
      debugName: `${debugGroupName}/etablissements`,
      logDataWithErrors: false,
    }
  );
  const status = {
    informationsGenerales: informationsGenerales,
    etablissements: etablissements,
  };

  status.global = getGlobalStatus(status);

  return status;
};
