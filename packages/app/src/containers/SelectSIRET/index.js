import { components } from "react-select";

import { fullText } from "~/query-service/datagouv/api-siren";
import { FormGroupSelect } from "~/components/AppForm";

// https://entreprise.data.gouv.fr/api_doc/sirene
// https://sirene.fr/sirene/public/static/liste-variables

function OptionSelectSIRET(props) {
  let label;
  const option = props.data;
  if (option.data) {
    const { data } = option;
    const { siret, nom_raison_sociale } = data;
    label = siret + " - " + nom_raison_sociale;
  } else {
    label = `"` + option.value + `"`;
  }

  return <components.Option {...props}>{label}</components.Option>;
}

const defaultPlaceholder = "Rechercher par Nom, SIRET, SIRET, adresse...";

const loadOptions = async (search) => {
  const result = await fullText(search);
  const { etablissement = [] } = result;
  const options = etablissement.map((data) => {
    const { siret } = data;
    return {
      value: siret,
      label: siret,
      data: data,
    };
  });
  return options;
};

export default function SelectSIRET({
  label = "SIRET",
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
        Option: OptionSelectSIRET,
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
