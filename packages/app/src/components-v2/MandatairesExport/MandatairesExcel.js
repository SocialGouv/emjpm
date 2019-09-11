import * as XLSX from "xlsx";

const NON_RENSEIGNE = "Non renseigné";

const cellValue = value => {
  if (value == undefined) {
    return NON_RENSEIGNE;
  }
  return value;
};

const remainingCapacity = (max, awaiting, inProgress) => {
  if (max != undefined && awaiting != undefined && inProgress != undefined) {
    return max - awaiting - inProgress;
  }
  return NON_RENSEIGNE;
};

const getMandataireRows = (datas, type) => {
  return datas
    .filter(user => user.type === type)
    .map(data => {
      const inProgress = data.mandataire ? data.mandataire.mesures_en_cours : undefined;
      const awaiting = data.mandataire ? data.mandataire.mesures_en_attente : undefined;
      const max = data.mandataire ? data.mandataire.dispo_max : undefined;
      return {
        Genre: cellValue(data.mandataire ? data.mandataire.genre : undefined),
        Prénom: cellValue(data.prenom),
        Nom: cellValue(data.nom),
        Adresse: cellValue(data.mandataire ? data.mandataire.adresse : undefined),
        "Code postal": cellValue(data.mandataire ? data.mandataire.code_postal : undefined),
        Ville: cellValue(data.mandataire ? data.mandataire.ville : undefined),
        Télephone: cellValue(data.mandataire ? data.mandataire.telephone : undefined),
        Portable: cellValue(data.mandataire ? data.mandataire.portable : undefined),
        "Disponibilité actuelle": remainingCapacity(max, awaiting, inProgress),
        "Mesures en cours": cellValue(inProgress),
        "Mesures en attente": cellValue(awaiting),
        "Disponibilité max": cellValue(max)
      };
    });
};

const getServiceRows = datas => {
  return datas.map(data => {
    const inProgress = data.service_antennes.reduce(
      (acc, current) => acc + current.mesures_in_progress,
      0
    );
    const awaiting = data.service_antennes.reduce(
      (acc, current) => acc + current.mesures_awaiting,
      0
    );
    const max = data.dispo_max;
    return {
      Nom: cellValue(data.etablissement),
      Adresse: cellValue(data.adresse),
      "Code postal": cellValue(data.code_postal),
      Ville: cellValue(data.ville),
      Email: cellValue(data.email),
      Télephone: cellValue(data.telephone),
      "Nom du contact": cellValue(data.nom),
      "Prénom du contact": cellValue(data.prenom),
      "Disponibilité actuelle": remainingCapacity(max, awaiting, inProgress),
      "Mesures en cours": cellValue(inProgress),
      "Mesures en attente": cellValue(awaiting),
      "Disponibilité max": cellValue(max),
      "Nombre d'antenne": data.service_antennes.length
    };
  });
};

const writeSheet = (wb, region, department, title, datas) => {
  const filterData = [
    {
      Région: region ? region.label : "Aucun filtre",
      Département: department ? department.label : "Aucun filtre"
    }
  ];

  wb.SheetNames.push(title);
  wb.Sheets[title] = XLSX.utils.sheet_add_json(wb.Sheets[title], [{ title: title }], {
    skipHeader: true,
    origin: "B2"
  });
  wb.Sheets[title] = XLSX.utils.sheet_add_json(wb.Sheets[title], filterData, {
    skipHeader: false,
    origin: "B4"
  });
  wb.Sheets[title] = XLSX.utils.sheet_add_json(wb.Sheets[title], datas, {
    skipHeader: false,
    origin: "B7"
  });
};

export const exportMandataires = (users, services, region, department) => {
  const wb = XLSX.utils.book_new();

  wb.Props = {
    Title: "e-EMJPM - export des mandataires"
  };

  writeSheet(
    wb,
    region,
    department,
    "Mandataires individuels",
    getMandataireRows(users, "individuel")
  );
  writeSheet(wb, region, department, "Mandataires préposés", getMandataireRows(users, "prepose"));
  writeSheet(wb, region, department, "Services", getServiceRows(services));

  const regionLabel = region ? region.label : "France";
  const departementLabel = department ? department.label : undefined;
  const filterLabel = departementLabel ? departementLabel : regionLabel;
  XLSX.writeFile(wb, `eEMJPM - Mandataire_${filterLabel}.xlsx`);
};
