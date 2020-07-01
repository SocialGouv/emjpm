const departementToOptions = (datas, config) => {
  let options = datas.map((departement) => ({
    departement,
    label: formatDepartementLabel(departement),
    value: departement["code"],
  }));
  options.sort(function (a, b) {
    return a.label.localeCompare(b.label);
  });
  if (
    config &&
    config.nullOption &&
    config.nullOption.label !== null &&
    config.nullOption.label !== undefined
  ) {
    const nullOption = {
      label: config.nullOption.label,
      value: null,
    };
    options = [nullOption].concat(options);
  }

  return options;
};

function formatDepartementLabel(departement) {
  return `${departement["code"]} - ${departement["nom"]}`;
}

export const DepartementFormUtil = {
  departementToOptions,
  formatDepartementLabel,
};
