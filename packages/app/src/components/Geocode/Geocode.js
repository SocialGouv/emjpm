import { findDepartementByCodeOrId } from "@emjpm/biz";

import { Box } from "rebass";

import { AsyncSelect, Spinner } from "~/ui";
import { useDepartements } from "~/util/departements/useDepartements.hook";
import { debouncedGeocode } from "~/util/geocode";

const Geocode = (props) => {
  const { hasError, onChange, placeholder, resource, instanceId } = props;

  const { departements, error, loading } = useDepartements({ all: true });
  if (error) {
    return <Box>{error}</Box>;
  }
  if (loading) {
    return <Spinner />;
  }

  const { adresse, code_postal, departement_id, latitude, longitude, ville } =
    resource || {};

  const departement =
    findDepartementByCodeOrId(departements, { id: departement_id }) || {};

  const geocode = {
    city: ville,
    depcode: departement.code,
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
