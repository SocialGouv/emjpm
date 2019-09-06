import * as XLSX from "xlsx";

const getMandataireRows = (datas, type) => {
  return datas
    .filter(user => user.type === type)
    .map(data => {
      return {
        Genre: data.mandataire ? data.mandataire.genre : "",
        Prénom: data.prenom,
        Nom: data.nom,
        Adresse: data.mandataire ? data.mandataire.adresse : "",
        "Code postal": data.mandataire ? data.mandataire.code_postal : "",
        Ville: data.mandataire ? data.mandataire.ville : "",
        Télephone: data.mandataire ? data.mandataire.telephone : "",
        Portable: data.mandataire ? data.mandataire.portable : "",
        "Mesures en cours": data.mandataire ? data.mandataire.mesures_en_cours : "",
        "Mesures en attente": data.mandataire ? data.mandataire.mesures_en_attente : "",
        "Disponibilité max": data.mandataire ? data.mandataire.dispo_max : ""
      };
    });
};

const getServiceRows = datas => {
  return datas.map(data => {
    return {
      Nom: data.etablissement,
      Adresse: data.adresse,
      "Code postal": data.code_postal,
      Ville: data.ville,
      Télephone: data.telephone,
      "Mesures en cours": data.service_antennes.reduce(
        (acc, current) => acc + current.mesures_in_progress,
        0
      ),
      "Mesures en attente": data.service_antennes.reduce(
        (acc, current) => acc + current.mesures_awaiting,
        0
      ),
      "Disponibilité max": data.dispo_max
    };
  });
};

export const exportMandataires = (users, services, regionalValue, departementalValue) => {
  const wb = XLSX.utils.book_new();

  wb.Props = {
    Title: "e-EMJPM - export des mandataires"
  };

  const indTitle = "Mandataires individuels";
  const preTitle = "Mandataires préposés";
  const serviceTitle = "Services";

  const exportDataOptions = {
    skipHeader: false,
    origin: "B2"
  };
  const exportFilterOptions = {
    skipHeader: false,
    origin: "N2"
  };

  const filterData = [
    {
      Région: regionalValue ? regionalValue.label : "Aucun filtre",
      Département: departementalValue ? departementalValue.label : "Aucun filtre"
    }
  ];

  const individuelsData = getMandataireRows(users, "individuel");
  wb.SheetNames.push(indTitle);
  wb.Sheets[indTitle] = XLSX.utils.sheet_add_json(
    wb.Sheets[indTitle],
    filterData,
    exportFilterOptions
  );
  wb.Sheets[indTitle] = XLSX.utils.sheet_add_json(
    wb.Sheets[indTitle],
    individuelsData,
    exportDataOptions
  );

  const preposesData = getMandataireRows(users, "prepose");
  wb.SheetNames.push(preTitle);
  wb.Sheets[preTitle] = XLSX.utils.sheet_add_json(
    wb.Sheets[preTitle],
    filterData,
    exportFilterOptions
  );
  wb.Sheets[preTitle] = XLSX.utils.sheet_add_json(
    wb.Sheets[preTitle],
    preposesData,
    exportDataOptions
  );

  const sercicesData = getServiceRows(services);
  wb.SheetNames.push(serviceTitle);
  wb.Sheets[serviceTitle] = XLSX.utils.sheet_add_json(
    wb.Sheets[serviceTitle],
    filterData,
    exportFilterOptions
  );
  wb.Sheets[serviceTitle] = XLSX.utils.sheet_add_json(
    wb.Sheets[serviceTitle],
    sercicesData,
    exportDataOptions
  );

  const region = regionalValue ? regionalValue.label : "France";
  const departement = departementalValue ? departementalValue.label : undefined;
  XLSX.writeFile(wb, `eEMJPM - Mandataire_${departement ? departement : region}.xlsx`);
};
