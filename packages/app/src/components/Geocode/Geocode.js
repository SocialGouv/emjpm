import { AsyncSelect } from "@emjpm/ui";
import React from "react";

import { debouncedGeocode } from "../../util/geocode";

const Geocode = (props) => {
  const { hasError, onChange, placeholder, resource, instanceId } = props;

  const {
    address,
    adresse,
    address_city,
    address_zip_code,
    code_postal,
    departement_id,
    latitude,
    longitude,
    ville,
  } = resource || {};

  const geocode = {
    city: ville || address_city,
    depcode: departement_id,
    label: address || adresse || ville || address_city,
    latitude,
    longitude,
    postcode: code_postal || address_zip_code,
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
