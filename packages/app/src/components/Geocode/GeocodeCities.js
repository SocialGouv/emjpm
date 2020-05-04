import { Select } from "@emjpm/ui";
import React from "react";
import { useQuery } from "react-apollo";

import { CODE_POSTAL } from "./queries";

export const GeocodeCities = props => {
  const { onChange, hasError, zipcode, value, name } = props;
  const { data, loading } = useQuery(CODE_POSTAL, {
    variables: {
      zipcode: zipcode
    }
  });

  let options = [];
  if (data && !loading) {
    const { geolocalisation_code_postal } = data;
    options = geolocalisation_code_postal.map(item => {
      return {
        value: item.cities,
        label: item.cities
      };
    });
  }

  return (
    <Select
      instanceId={name}
      isClearable={false}
      value={value ? { label: value, value } : { label: "", value: "" }}
      placeholder="Ville"
      hasError={hasError}
      onChange={item => onChange(item.value)}
      options={options}
    />
  );
};

export default GeocodeCities;
