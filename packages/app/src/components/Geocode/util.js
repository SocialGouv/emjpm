import { getDepartementCode } from "@emjpm/core";

const geocodeInitialValue = (resource = {}) => {
  if (!resource.latitude || !resource.longitude) {
    return {
      city: "",
      depcode: "",
      label: "",
      latitude: "",
      longitude: "",
      postcode: "",
    };
  }

  const postcode =
    resource.code_postal || resource.code_postal || resource.codePostal;
  const depcode = getDepartementCode(postcode);
  return {
    city: resource.ville,
    depcode,
    label: resource.adresse,
    latitude: resource.latitude,
    longitude: resource.longitude,
    postcode,
  };
};

export { geocodeInitialValue };
