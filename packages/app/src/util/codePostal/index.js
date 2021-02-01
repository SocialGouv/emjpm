const codePostalDB = import("./code_postal.json");

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
