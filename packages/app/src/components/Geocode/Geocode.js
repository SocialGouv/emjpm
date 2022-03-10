import { findDepartementByCodeOrId } from "@emjpm/biz";

import { AccessibleSelect } from "~/components";
import { useDepartements } from "~/utils/departements/useDepartements.hook";
import { debouncedGeocode } from "~/query-service/datagouv/api-adresse/geocode";
import useQueryReady from "~/hooks/useQueryReady";

function Geocode(props) {
  const {
    hasError,
    onChange,
    placeholder,
    resource,
    instanceId,
    id,
    ...selectProps
  } = props;

  const { departements, error, loading } = useDepartements({ all: true });

  if (!useQueryReady(loading, error)) {
    return null;
  }

  const { adresse, code_postal, departement_code, latitude, longitude, ville } =
    resource || {};

  const departement =
    findDepartementByCodeOrId(departements, { code: departement_code }) || {};

  const geocode = {
    city: ville,
    depcode: departement.id,
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
    <AccessibleSelect
      isAsync
      instanceId={instanceId}
      id={id}
      defaultValue={defaultValue}
      hasError={hasError}
      isClearable
      loadOptions={(value) => debouncedGeocode({ query: value })}
      placeholder={placeholder || "Adresse, ville, ..."}
      noOptionsMessage={() => "Pas de résultats"}
      onChange={onChange}
      {...selectProps}
    />
  );
}

export { Geocode };
