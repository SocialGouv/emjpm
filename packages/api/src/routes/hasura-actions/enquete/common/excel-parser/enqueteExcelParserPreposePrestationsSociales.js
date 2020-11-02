/* eslint-disable no-unused-vars */
const { enqueteExcelParser: parser } = require("./services");

function parse(ws) {
  const tutelle = {
    tranche1: parser.integer(ws["D6"]),
    tranche10: parser.integer(ws["D15"]),
    tranche11: parser.integer(ws["D16"]),
    tranche2: parser.integer(ws["D7"]),
    tranche3: parser.integer(ws["D8"]),
    tranche4: parser.integer(ws["D9"]),
    tranche5: parser.integer(ws["D10"]),
    tranche6: parser.integer(ws["D11"]),
    tranche7: parser.integer(ws["D12"]),
    tranche8: parser.integer(ws["D13"]),
    tranche9: parser.integer(ws["D14"]),
  };

  const curatelle_simple = {
    tranche1: parser.integer(ws["E6"]),
    tranche10: parser.integer(ws["E15"]),
    tranche11: parser.integer(ws["E16"]),
    tranche2: parser.integer(ws["E7"]),
    tranche3: parser.integer(ws["E8"]),
    tranche4: parser.integer(ws["E9"]),
    tranche5: parser.integer(ws["E10"]),
    tranche6: parser.integer(ws["E11"]),
    tranche7: parser.integer(ws["E12"]),
    tranche8: parser.integer(ws["E13"]),
    tranche9: parser.integer(ws["E14"]),
  };

  const curatelle_renforcee = {
    tranche1: parser.integer(ws["F6"]),
    tranche10: parser.integer(ws["F15"]),
    tranche11: parser.integer(ws["F16"]),
    tranche2: parser.integer(ws["F7"]),
    tranche3: parser.integer(ws["F8"]),
    tranche4: parser.integer(ws["F9"]),
    tranche5: parser.integer(ws["F10"]),
    tranche6: parser.integer(ws["F11"]),
    tranche7: parser.integer(ws["F12"]),
    tranche8: parser.integer(ws["F13"]),
    tranche9: parser.integer(ws["F14"]),
  };

  const sauvegarde_autres_mesures = {
    tranche1: parser.integer(ws["G6"]),
    tranche10: parser.integer(ws["G15"]),
    tranche11: parser.integer(ws["G16"]),
    tranche2: parser.integer(ws["G7"]),
    tranche3: parser.integer(ws["G8"]),
    tranche4: parser.integer(ws["G9"]),
    tranche5: parser.integer(ws["G10"]),
    tranche6: parser.integer(ws["G11"]),
    tranche7: parser.integer(ws["G12"]),
    tranche8: parser.integer(ws["G13"]),
    tranche9: parser.integer(ws["G14"]),
  };

  const maj = {
    tranche1: parser.integer(ws["H6"]),
    tranche10: parser.integer(ws["H15"]),
    tranche11: parser.integer(ws["H16"]),
    tranche2: parser.integer(ws["H7"]),
    tranche3: parser.integer(ws["H8"]),
    tranche4: parser.integer(ws["H9"]),
    tranche5: parser.integer(ws["H10"]),
    tranche6: parser.integer(ws["H11"]),
    tranche7: parser.integer(ws["H12"]),
    tranche8: parser.integer(ws["H13"]),
    tranche9: parser.integer(ws["H14"]),
  };

  return {
    aah: parser.integer(ws["D22"]),
    als_apl: parser.integer(ws["D26"]),
    asi: parser.integer(ws["D24"]),
    apa: parser.integer(ws["D28"]),
    curatelle_renforcee,
    aspa: parser.integer(ws["D27"]),
    curatelle_simple,
    maj,
    pch: parser.integer(ws["D23"]),
    rsa: parser.integer(ws["D25"]),
    tutelle,
    sauvegarde_autres_mesures,
  };
}

module.exports = {
  parse,
};
