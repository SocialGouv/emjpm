import yup from "../../../../lib/validationSchemas/yup";
// fonction identique à activiteSchemaUtil
export function buildMesureGroupsAttributes(mesureGroups) {
  const attributes = mesureGroups.reduce((acc, mesureGroup) => {
    const debutAnnee = mesureGroup ? `${mesureGroup}DebutAnnee` : "debutAnnee";
    const finAnnee = mesureGroup ? `${mesureGroup}FinAnnee` : "finAnnee";
    const mesuresNouvelles = mesureGroup ? `${mesureGroup}MesuresNouvelles` : "mesuresNouvelles";
    const sortieMesures = mesureGroup ? `${mesureGroup}SortieMesures` : "sortieMesures";
    const somme = mesureGroup ? `${mesureGroup}Somme` : "somme";

    acc[debutAnnee] = yup.number().min(0).integer();

    acc[mesuresNouvelles] = yup.number().min(0).integer();
    acc[sortieMesures] = yup.number().min(0).integer();
    acc[finAnnee] = yup.number().min(0).integer();

    acc[somme] = yup
      .number()
      .min(0)
      .integer()
      .test(
        "diff-match",
        "La valeur de fin d'année n'est pas cohérente avec les autres données.",
        function () {
          const nbDebutAnnee = this.parent[debutAnnee] | 0;
          const nbSortieMesures = this.parent[sortieMesures] | 0;
          const nbMesuresNouvelles = this.parent[mesuresNouvelles] | 0;
          const nbFinAnnee = this.parent[finAnnee] | 0;
          const expectedFinAnnee = nbDebutAnnee + nbMesuresNouvelles - nbSortieMesures;

          return expectedFinAnnee === nbFinAnnee;
        }
      );

    return acc;
  }, {});
  return attributes;
}
