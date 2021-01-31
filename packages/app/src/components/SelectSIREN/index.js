import { AsyncSelectCreatable } from "~/ui";
import { components } from "react-select";

import { fullText } from "~/query-service/datagouv/api-siren";
import { FormGroupSelect } from "~/components/AppForm";
import debouncePromise from "~/util/async/debouncePromise";

// https://entreprise.data.gouv.fr/api_doc/sirene
// https://sirene.fr/sirene/public/static/liste-variables

const promiseOptions = debouncePromise(async (search) => {
  const { etablissement } = await fullText(search);
  return etablissement.map((data) => {
    const { siren } = data;
    return {
      value: siren,
      label: siren,
      data: data,
    };
  });
}, 200);

function CustomOptionSelectSIREN(props) {
  let label;
  const option = props.data;
  if (option.data) {
    const { data } = option;
    const { siren, nom_raison_sociale } = data;
    label = siren + " - " + nom_raison_sociale;
  } else {
    label = option.value;
  }

  return <components.Option {...props}>{label}</components.Option>;
}

const placeholder = "Rechercher par Nom, SIREN, SIRET, adresse...";

function SelectSIREN({ dataSetter = () => {}, formik, ...props }) {
  return (
    <FormGroupSelect
      component={AsyncSelectCreatable}
      loadOptions={promiseOptions}
      components={{
        Option: CustomOptionSelectSIREN,
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

SelectSIREN.defaultProps = {
  label: "SIREN",
  placeholder: placeholder,
};

export default SelectSIREN;
