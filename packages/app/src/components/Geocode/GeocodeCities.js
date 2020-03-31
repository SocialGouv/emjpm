import { Select } from "@emjpm/ui";
import React, { useEffect, useState } from "react";

import { debouncedGeocode } from "../../util/geocode";

export function useAsyncMemo(factory, deps, initial) {
  const [val, setVal] = useState(initial);
  useEffect(() => {
    let cancel = false;
    const promise = factory();
    if (promise === undefined || promise === null) return;
    promise.then(val => {
      if (!cancel) {
        setVal(val);
      }
    });
    return () => {
      cancel = true;
    };
  }, deps);
  return val;
}

export const GeocodeCities = props => {
  const { onChange, placeholder, zipcode, value } = props;

  const options = useAsyncMemo(
    async () => {
      const results = await debouncedGeocode({
        q: zipcode,
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
