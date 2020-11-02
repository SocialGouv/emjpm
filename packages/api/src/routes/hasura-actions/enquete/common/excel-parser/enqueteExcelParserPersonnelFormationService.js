const { enqueteExcelParser: parser } = require("./services");

function parse(ws) {
  const result = {
    nb_delegues: parser.integer(ws["C6"]),
    nb_delegues_cnc: parser.integer(ws["C9"]),
    nb_delegues_en_formation: parser.integer(ws["C10"]),
    nb_delegues_etp: parser.float(ws["D6"]),
    nb_delegues_femme: parser.integer(ws["C30"]),
    nb_delegues_femme_etp: parser.float(ws["D30"]),
    nb_delegues_homme: parser.integer(ws["C29"]),
    nb_delegues_homme_etp: parser.float(ws["D29"]),
    nb_delegues_niveau1: parser.integer(ws["C16"]),
    nb_delegues_niveau1_etp: parser.float(ws["D16"]),
    nb_delegues_niveau2: parser.integer(ws["C17"]),
    nb_delegues_niveau2_etp: parser.float(ws["D17"]),
    nb_delegues_niveau3: parser.integer(ws["C18"]),
    nb_delegues_niveau3_etp: parser.float(ws["D18"]),
    nb_delegues_niveau4: parser.integer(ws["C19"]),
    nb_delegues_niveau4_etp: parser.float(ws["D19"]),
    nb_delegues_niveau5: parser.integer(ws["C20"]),
    nb_delegues_niveau5_etp: parser.float(ws["D20"]),
    nb_delegues_niveau6: parser.integer(ws["C21"]),
    nb_delegues_niveau6_etp: parser.float(ws["D21"]),
    nb_delegues_non_formes: parser.integer(ws["C11"]),
    total_heures_delegues_en_formation: parser.float(ws["D10"]),
  };

  return result;
}

module.exports = {
  parse,
};
