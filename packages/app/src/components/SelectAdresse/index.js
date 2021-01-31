import { AsyncSelectCreatable } from "~/ui";
import { components } from "react-select";

import { searchAdresse } from "~/query-service/datagouv/api-adresse";
import { FormGroupSelect } from "~/components/AppForm";
import debouncePromise from "~/util/async/debouncePromise";

// https://geo.api.gouv.fr/adresse

const promiseOptions = debouncePromise(async (search) => {
  const { features } = await searchAdresse(search);
  return features.map(({ properties }) => {
    const { name } = properties;
    return {
      value: name,
      label: name,
      data: properties,
    };
  });
}, 200);

function CustomOptionSelectAdresse(props) {
  let label;
  const option = props.data;
  if (option.data) {
    const { data } = option;
    label = data.label;
  } else {
    label = option.value;
  }

  return <components.Option {...props}>{label}</components.Option>;
}

const placeholder = "Commencez la saisie pour chercher une adresse...";

function SelectAdresse({ dataSetter = () => {}, formik, ...props }) {
  return (
    <FormGroupSelect
      component={AsyncSelectCreatable}
      loadOptions={promiseOptions}
      components={{
        Option: CustomOptionSelectAdresse,
      }}
      isClearable
      formik={formik}
      onChange={(option) => {
        dataSetter(option?.data);
        formik.setFieldValue(props.id, option?.value || "");
      }}
      noOptionsMessage={() => {
        return placeholder;
      }}
      createNewOptionOnBlur
      editSelectedTag
      {...props}
    />
  );
}

SelectAdresse.defaultProps = {
  label: "Adresse",
  placeholder: placeholder,
};

export default SelectAdresse;
