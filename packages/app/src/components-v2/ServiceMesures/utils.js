export const formatMesureList = mesureList => {
  const mesures = mesureList.map(mesure => {
    const { type, ville, status, id, annee, civilite, date_ouverture, numero_rg } = mesure;
    return {
      age: annee ? annee : "nc",
      civilite: civilite ? civilite : "H",
      dateOuverture: date_ouverture ? date_ouverture : "non reseigné",
      href: `/services/mesure/${id}/`,
      id: id,
      numeroRg: numero_rg ? numero_rg : "RG-00000000",
      status: status ? status : "non reseigné",
      type: type ? type : "type de mesure non reseigné",
      ville: ville ? ville : "ville non reseigné"
    };
  });
  return mesures;
};
