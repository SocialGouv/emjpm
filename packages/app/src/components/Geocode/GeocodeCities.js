import { Select } from "@emjpm/ui";
import React from "react";

import { useAsyncMemo } from "../../lib/hooks/useAsyncMemo";
import { debouncedGeocode } from "../../util/geocode";

export const GeocodeCities = props => {
  const { onChange, hasError, zipcode, value, name } = props;
  const options = useAsyncMemo(
    async () => {
      const results = await debouncedGeocode({
        query: zipcode,
        postcode: zipcode,
        type: "municipality"
      });
      return results;
    },
    [zipcode],
    []
  );

  return (
    <Select
      instanceId={name}
      isClearable={false}
      value={value ? { label: value, value } : { label: "", value: "" }}
      placeholder="Ville"
      hasError={hasError}
      onChange={({ city }) => onChange(city)}
      options={options}
    />
  );
};

export default GeocodeCities;
