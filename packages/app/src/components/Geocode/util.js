import { getRegionCode } from "../../util/departements";

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
    resource.code_postal || resource.address_zip_code || resource.codePostal;
  const depcode = getRegionCode(postcode);
  return {
    city: resource.ville || resource.address_city,
    depcode,
    label:
      resource.address ||
      resource.adresse ||
      resource.ville ||
      resource.address_city,
    latitude: resource.latitude,
    longitude: resource.longitude,
    postcode,
  };
};

export { geocodeInitialValue };
