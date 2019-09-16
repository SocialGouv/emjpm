// move me in the good folder
export const formatMesureList = mesureList => {
  const mesures = mesureList.map(mesure => {
    const {
      residence,
      code_postal,
      numero_dossier,
      antenne_id,
      type,
      ville,
      status,
      id,
      annee,
      civilite,
      date_ouverture,
      numero_rg
    } = mesure;
    return {
      age: annee ? annee : "nc",
      civilite: civilite ? civilite : "H",
      dateOuverture: date_ouverture ? date_ouverture : "non reseigné",
      href: `/services/mesure/${id}/`,
      id: id,
      numeroRg: numero_rg ? numero_rg : "RG-00000000",
      status: status ? status : "non reseigné",
      type: type ? type : "type de mesure non reseigné",
      ville: ville ? ville : "ville non reseigné",
      residence: residence ? residence : "non reseigné",
      codePostal: code_postal ? code_postal : "non reseigné",
      numeroDossier: numero_dossier ? numero_dossier : "non reseigné",
      antenneId: antenne_id ? antenne_id : "non reseigné"
    };
  });
  return mesures;
};
