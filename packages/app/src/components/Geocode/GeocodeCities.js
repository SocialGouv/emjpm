import { Select } from "@emjpm/ui";
import React from "react";

import { useAsyncMemo } from "../../lib/hooks/useAsyncMemo";
import { debouncedGeocode } from "../../util/geocode";

export const GeocodeCities = props => {
  const { onChange, placeholder, zipcode, value } = props;

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
      isClearable={false}
      value={{ label: value, value }}
      placeholder={placeholder}
      onChange={({ city }) => onChange(city)}
      options={options}
    />
  );
};

export default GeocodeCities;
