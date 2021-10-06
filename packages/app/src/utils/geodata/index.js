import regions from "./regions.json";
import departements from "./departements.json";

export const regionList = Object.entries(regions).map(([code, nom]) => {
  return {
    code,
    nom,
  };
});

export const departementsByRegionCode = {};

export const departementList = Object.entries(departements)
  .map(([code, { nom, region }]) => {
    const departement = {
      code,
      nom,
      region,
    };

    // optimization over consitency
    if (!departementsByRegionCode[region]) {
      departementsByRegionCode[region] = [];
    }
    departementsByRegionCode[region].push(departement);

    return departement;
  })
  .sort(function (a, b) {
    return a.code.replace(/\D/g, "9") - b.code.replace(/\D/g, "9");
  });

export const getRegionName = (code) => {
  return regions[code];
};
export const getDepartementName = (code) => {
  return departements[code]?.nom;
};
export const getDepartementRegionCode = (code) => {
  return departements[code]?.region;
};
export const getDepartementRegionName = (code) => {
  return regions[getDepartementRegionCode(code)];
};

export const getRegionDepartementList = (code) => {
  return departementsByRegionCode[code];
};

const defaultFormatRegionLabel = ({ nom }) => {
  return nom;
};
const defaultCreateRegionOptions = {
  all: true,
  formatLabel: defaultFormatRegionLabel,
};
export const createRegionOptions = (rows, options = {}) => {
  options = { ...defaultCreateRegionOptions, ...options };
  const opts = [];
  if (options.all) {
    opts.push({
      label: "Toutes les régions",
      value: null,
    });
  }
  opts.push(
    ...rows.map((row) => ({
      value: row.code || row.id,
      label: options.formatLabel(row),
    }))
  );
  return opts;
};

const defaultFormatDepartementLabel = (row) => {
  return (row.id || row.code) + " " + row.nom;
};
const defaultCreateDepartementOptions = {
  all: true,
  formatLabel: defaultFormatDepartementLabel,
};
export const createDepartementOptions = (rows, options = {}) => {
  options = { ...defaultCreateDepartementOptions, ...options };
  const opts = [];
  if (options.all && rows.length > 0) {
    opts.push({
      label: "Tous les départements",
      value: null,
    });
  }
  opts.push(
    ...rows.map((row) => ({
      value: row.code || row.id,
      label: options.formatLabel(row),
    }))
  );
  opts.sort(function (a, b) {
    return a.label - b.label;
  });
  return opts;
};

export const regionOptions = createRegionOptions(regionList);
export const departementOptions = createDepartementOptions(departementList);
