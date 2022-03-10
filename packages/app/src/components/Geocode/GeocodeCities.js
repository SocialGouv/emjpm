import { useLazyQuery } from "@apollo/client";

import { AccessibleSelect } from "~/components";

import { CODE_POSTAL } from "./queries";
import { useEffect } from "react";

export function GeocodeCities(props) {
  const {
    onChange,
    hasError,
    zipcode,
    value,
    name,
    size,
    required,
    formik = {},
    departementFieldId,
    instanceId,
    id,
  } = props;
  const [execQuery, queryResult] = useLazyQuery(CODE_POSTAL);
  const { data, loading } = queryResult;
  useEffect(() => {
    if (!zipcode) return;
    execQuery({
      variables: {
        zipcode,
      },
    });
  }, [zipcode, execQuery]);

  const { setFieldValue } = formik;
  useEffect(() => {
    if (!(setFieldValue && departementFieldId && data)) {
      return;
    }
    const item = data.geolocalisation_code_postal.find(
      ({ cities }) => cities === value
    );
    if (!item) {
      return;
    }
    setFieldValue(departementFieldId, item.departement_code);
  }, [data, setFieldValue, departementFieldId, value]);

  let options = [];
  if (data && !loading) {
    const { geolocalisation_code_postal } = data;
    options = geolocalisation_code_postal.map((item) => {
      return {
        label: item.cities,
        value: item.cities,
      };
    });
  }

  return (
    <AccessibleSelect
      instanceId={name || instanceId || id}
      isClearable={false}
      value={value ? { label: value, value } : { label: "", value: "" }}
      placeholder="Ville"
      hasError={hasError}
      onChange={(item) => onChange(item.value)}
      options={options}
      size={size ? size : ""}
      required={required}
    />
  );
}

export default GeocodeCities;
