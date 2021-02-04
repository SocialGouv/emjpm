import { components } from "react-select";

import { searchAdresse } from "~/query-service/datagouv/api-adresse";
import { FormGroupSelect } from "~/components/AppForm";

// https://geo.api.gouv.fr/adresse

function OptionSelectAdresse(props) {
  let label;
  const option = props.data;
  if (option.data) {
    const { data } = option;
    label = data.label;
  } else {
    label = `"` + option.value + `"`;
  }

  return <components.Option {...props}>{label}</components.Option>;
}

const defaultPlaceholder = "Commencez la saisie pour chercher une adresse...";

const loadOptions = async (search) => {
  const result = await searchAdresse(search);
  const { features = [] } = result;
  const options = features.map(({ properties }) => {
    const { name } = properties;
    return {
      value: name,
      label: name,
      data: properties,
    };
  });
  return options;
};

export default function SelectAdresse({
  label = "Adresse",
  placeholder = defaultPlaceholder,
  formik,
  ...props
}) {
  return (
    <FormGroupSelect
      loadOptions={loadOptions}
      isCreatable
      label={label}
      placeholder={placeholder}
      components={{
        Option: OptionSelectAdresse,
      }}
      isClearable
      formik={formik}
      noOptionsMessage={() => {
        return defaultPlaceholder;
      }}
      {...props}
    />
  );
}
