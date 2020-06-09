const {
  getValidationStatus,
  getGlobalStatus
} = require("../enqueteSchemaUtil");
const yup = require("yup");

const debugGroupName = "modalitesExercice";

module.exports = async enqueteReponse => {
  const status = {
    informationsGenerales: await getValidationStatus(
      enqueteReponse.enquete_reponses_modalites_exercice,
      {
        schema: yup.object().shape({
          departement: yup.string().required(),
          region: yup.string().required(),
          raison_sociale: yup.string().required(),
          personnalite_juridique_etablissement: yup.string().required(),
          activite_personne_physique: yup.number().min(0),
          activite_service: yup.number().min(0),
          total_mesures_etablissements: yup.number().min(0),
          etablissement_personne_morale: yup.number().min(0),
          etablissement_convention_groupement: yup.number().min(0)
        }),
        debugName: `${debugGroupName}/informationsGenerales`,
        logDataWithErrors: false
      }
    ),
    etablissements: await getValidationStatus(
      enqueteReponse.enquete_reponses_modalites_exercice,
      {
        schema: yup.object().shape({
          etablissements: yup.array().of(
            yup.object().shape({
              finess: yup.string().required(),
              nombre_journees_hospitalisation: yup
                .number()
                .min(0)
                .required(),
              nombre_lits: yup
                .number()
                .min(0)
                .required(),
              raison_sociale: yup.string().required(),
              statut: yup.string().required(),
              type: yup.string().required(),
              nombre_journees_esms: yup
                .number()
                .min(0)
                .required(),
              nombre_mesures: yup
                .number()
                .min(0)
                .required()
            })
          )
        }),
        debugName: `${debugGroupName}/etablissements`,
        logDataWithErrors: false
      }
    )
  };

  status.global = getGlobalStatus(status);

  return status;
};
