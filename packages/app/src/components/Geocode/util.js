import { getDepartementCode } from "@emjpm/biz";

function geocodeInitialValue(resource = {}) {
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

  const postcode = resource.code_postal;
  const depcode = getDepartementCode(postcode);
  return {
    city: resource.ville,
    depcode,
    label: resource.adresse,
    latitude: resource.latitude,
    longitude: resource.longitude,
    postcode,
  };
}

export { geocodeInitialValue };
