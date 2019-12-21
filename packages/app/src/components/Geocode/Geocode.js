import { AsyncSelect } from "@socialgouv/emjpm-ui-core";
import React from "react";

import { debouncedGeocode } from "../../util/geocode";

const Geocode = props => {
  const { hasError, onChange, placeholder, resource } = props;
  const {
    address,
    adresse,
    address_city,
    address_zip_code,
    code_postal,
    departement_id,
    latitude,
    longitude,
    ville
  } = resource || {};

  const geocode = {
    city: ville || address_city,
    depcode: departement_id,
    postcode: code_postal || address_zip_code,
    label: address || adresse || ville || address_city,
    latitude,
    longitude
  };

  const isValid = !!latitude && !!longitude;
  const label = isValid ? geocode.label : "Adresse, ville, ...";
  const value = isValid ? geocode : undefined;
  const defaultValue = { label, value };

  return (
    <AsyncSelect
      defaultValue={defaultValue}
      hasError={hasError}
      isClearable
      loadOptions={debouncedGeocode}
      placeholder={placeholder || "Adresse, ville, ..."}
      noOptionsMessage={() => "Pas de résultats"}
      onChange={onChange}
    />
  );
};

export { Geocode };
