import { AsyncSelect } from "@emjpm/ui";
import React from "react";

import { debouncedGeocode } from "../../util/geocode";

const Geocode = (props) => {
  const { hasError, onChange, placeholder, resource, instanceId } = props;

  const { adresse, code_postal, departement_id, latitude, longitude, ville } =
    resource || {};

  const geocode = {
    city: ville,
    depcode: departement_id,
    label: adresse,
    latitude,
    longitude,
    postcode: code_postal,
  };

  const isValid = !!latitude && !!longitude;
  const defaultValue = isValid
    ? { label: geocode.label, value: geocode }
    : null;

  return (
    <AsyncSelect
      instanceId={instanceId}
      defaultValue={defaultValue}
      hasError={hasError}
      isClearable
      loadOptions={(value) => debouncedGeocode({ query: value })}
      placeholder={placeholder || "Adresse, ville, ..."}
      noOptionsMessage={() => "Pas de résultats"}
      onChange={onChange}
    />
  );
};

export { Geocode };
