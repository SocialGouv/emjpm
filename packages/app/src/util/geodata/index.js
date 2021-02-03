import regions from "./regions.json";
import departements from "./departements.json";

const codePostalDB = import("./code_postal.json");

export const departementList = Object.entries(departements).map(
  ([code, { name, region }]) => {
    return {
      code,
      name,
      region,
    };
  }
);
export const regionList = Object.entries(regions).map(([code, name]) => {
  return {
    code,
    name,
  };
});

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

export const createRegionOptions = (rows, options = { all: true }) => {
  const opts = [];
  if (options.all) {
    opts.push({
      label: "Toutes les régions",
      value: null,
    });
  }
  opts.push(
    ...Object.entries(rows).map(([code, { name }]) => ({
      value: parseInt(code),
      label: name,
    }))
  );
  return opts;
};

export const createDepartementOptions = (rows, options = { all: true }) => {
  const opts = [];
  if (options.all) {
    opts.push({
      label: "Tous les départements",
      value: null,
    });
  }
  opts.push(
    ...Object.entries(rows).map(([code, { name }]) => ({
      value: parseInt(code),
      label: name,
    }))
  );
  return opts;
};

export const regionOptions = createRegionOptions(regionList);
export const departementOptions = createDepartementOptions(departementList);
