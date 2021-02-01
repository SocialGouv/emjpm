import { useState, useEffect } from "react";

import { components } from "react-select";

import { FormGroupSelect } from "~/components/AppForm";

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
      isCreatable
      isClearable
      formik={formik}
      noOptionsMessage={() => {
        return "Saisissez le nom de la ville";
      }}
      options={options}
      filterOption={() => true}
      {...props}
    />
  );
}

SelectVille.defaultProps = {
  label: "Ville",
  placeholder: placeholder,
};

export default SelectVille;
