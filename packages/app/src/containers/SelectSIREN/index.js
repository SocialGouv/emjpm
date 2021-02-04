import { useCallback } from "react";
import { components } from "react-select";

import { fullText } from "~/query-service/datagouv/api-siren";
import { searchAdresse } from "~/query-service/datagouv/api-adresse";
import { FormGroupSelect } from "~/components/AppForm";

// https://entreprise.data.gouv.fr/api_doc/sirene
// https://sirene.fr/sirene/public/static/liste-variables

function OptionSelectSIREN(props) {
  let label;
  const option = props.data;
  if (option.data) {
    const { data } = option;
    const { siren, nom_raison_sociale } = data;
    label = siren + " - " + nom_raison_sociale;
  } else {
    label = `"` + option.value + `"`;
  }

  return <components.Option {...props}>{label}</components.Option>;
}

const defaultPlaceholder = "Rechercher par Nom, SIREN, SIRET, adresse...";

const loadOptions = async (search) => {
  const result = await fullText(search);
  const { etablissement = [] } = result;
  const options = etablissement.map((data) => {
    const { siren } = data;
    return {
      value: siren,
      label: siren,
      data: data,
    };
  });
  return options;
};

export default function SelectSIREN({
  label = "SIREN",
  placeholder = defaultPlaceholder,
  noOptionsMessage = () => {
    return defaultPlaceholder;
  },
  formik,
  ...props
}) {
  return (
    <FormGroupSelect
      loadOptions={loadOptions}
      isCreatable
      components={{
        Option: OptionSelectSIREN,
      }}
      isClearable
      formik={formik}
      placeholder={placeholder}
      label={label}
      noOptionsMessage={noOptionsMessage}
      {...props}
    />
  );
}
