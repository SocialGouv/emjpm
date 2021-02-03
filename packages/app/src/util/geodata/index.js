import regions from "./regions.json";
import departements from "./departements.json";

const codePostalDB = import("./code_postal.json");

export const getRegionName = (code) => {
  return regions[code];
};
export const getDepartementName = (code) => {
  return departements[code];
};
export const getDepartementRegionCode = (code) => {
  return departements[code]?.region;
};
export const getDepartementRegionName = (code) => {
  return regions[getDepartementRegionCode(code)];
};

export const codePostalExists = async (cp) => {
  const codePostal = await codePostalDB;
  return codePostal[cp] !== undefined;
};

export const getDepartementByCodePostal = async (cp) => {
  const codePostal = await codePostalDB;
  return codePostal[cp]?.departement;
};

export const getCommunesByCodePostal = async (cp) => {
  const codePostal = await codePostalDB;
  return codePostal[cp]?.communes;
};
