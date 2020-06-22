import yup from "../../../../lib/validationSchemas/yup";

// fonction identique à activiteSchemaUtil
export function buildMesureGroupsAttributes(mesureGroups) {
  const attributes = mesureGroups.reduce((acc, mesureGroup) => {
    const debutAnnee = mesureGroup ? `${mesureGroup}DebutAnnee` : "debutAnnee";
    const finAnnee = mesureGroup ? `${mesureGroup}FinAnnee` : "finAnnee";
    const mesuresNouvelles = mesureGroup ? `${mesureGroup}MesuresNouvelles` : "mesuresNouvelles";
    const sortieMesures = mesureGroup ? `${mesureGroup}SortieMesures` : "sortieMesures";
    const somme = mesureGroup ? `${mesureGroup}Somme` : "somme";

    acc[debutAnnee] = yup.number().min(0).integer().required();
    acc[mesuresNouvelles] = yup.number().min(0).integer().required();
    acc[sortieMesures] = yup.number().min(0).integer().required();
    acc[finAnnee] = yup.number().min(0).integer().required();

    acc[somme] = yup.mixed().test(function () {
      const nbDebutAnnee = this.parent[debutAnnee];
      const nbSortieMesures = this.parent[sortieMesures];
      const nbMesuresNouvelles = this.parent[mesuresNouvelles];
      const nbFinAnnee = this.parent[finAnnee];

      if (
        nbDebutAnnee !== undefined &&
        nbDebutAnnee !== null &&
        nbSortieMesures !== undefined &&
        nbSortieMesures !== null &&
        nbMesuresNouvelles !== undefined &&
        nbMesuresNouvelles !== null &&
        nbFinAnnee !== undefined &&
        nbFinAnnee !== null
      ) {
        const expectedFinAnnee = nbDebutAnnee + nbMesuresNouvelles - nbSortieMesures;

        if (expectedFinAnnee !== nbFinAnnee) {
          return this.createError({
            message: `La valeur de fin d'année n'est pas cohérente avec les autres données: ${nbDebutAnnee} + ${nbMesuresNouvelles} - ${nbSortieMesures} = ${expectedFinAnnee}`,
            path: somme,
          });
        }
      }
      return true;
    });

    return acc;
  }, {});
  return attributes;
}
