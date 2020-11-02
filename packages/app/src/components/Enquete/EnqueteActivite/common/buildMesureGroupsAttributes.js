import yup from "../../../../lib/validationSchemas/yup";

// fonction identique à activiteSchemaUtil
export function buildMesureGroupsAttributes(mesureGroups) {
  const attributes = mesureGroups.reduce((acc, mesureGroup) => {
    const debutAnnee = mesureGroup ? `${mesureGroup}DebutAnnee` : "debutAnnee";
    const finAnnee = mesureGroup ? `${mesureGroup}FinAnnee` : "finAnnee";
    const mesuresNouvelles = mesureGroup
      ? `${mesureGroup}MesuresNouvelles`
      : "mesuresNouvelles";
    const sortieMesures = mesureGroup
      ? `${mesureGroup}SortieMesures`
      : "sortieMesures";

    acc[debutAnnee] = yup.number().min(0).integer().nullable();
    acc[mesuresNouvelles] = yup.number().min(0).integer().nullable();
    acc[sortieMesures] = yup.number().min(0).integer().nullable();
    acc[finAnnee] = yup.number().min(0).integer().nullable();

    return acc;
  }, {});
  return attributes;
}
