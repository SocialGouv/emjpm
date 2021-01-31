import { useState, useEffect } from "react";

import { SelectCreatable } from "~/ui";
import { components } from "react-select";

import { fullText } from "~/query-service/datagouv/api-siren";
import { FormGroupSelect } from "~/components/AppForm";
import debouncePromise from "~/util/async/debouncePromise";

import { getCommunesByCodePostal } from "~/util/codePostal";

const placeholder = "Ville";

function SelectVille({ codePostal, formik, ...props }) {
  const [options, setOptions] = useState(() => []);
  useEffect(() => {
    if (codePostal) {
      getCommunesByCodePostal(codePostal).then((communes) => {
        if (!communes) return;
        setOptions(
          communes.map((value) => ({
            label: value,
            value,
          }))
        );
      });
    } else {
      setOptions([]);
    }
  }, [codePostal]);
  return (
    <FormGroupSelect
      component={SelectCreatable}
      formatCreateLabel={(inputValue) => inputValue}
      isClearable
      formik={formik}
      onChange={(option) => {
        formik.setFieldValue(props.id, option?.value || "");
      }}
      noOptionsMessage={() => {
        return "Saisissez le nom de la ville";
      }}
      options={options}
      setOptions={setOptions}
      createNewOptionOnBlur
      editSelectedTag
      {...props}
    />
  );
}

SelectVille.defaultProps = {
  label: "Ville",
  placeholder: placeholder,
};

export default SelectVille;
