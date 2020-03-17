const geocodeInitialValue = (resource = {}) => {
  if (!resource.latitude || !resource.longitude) {
    return {
      city: "",
      depcode: "",
      postcode: "",
      label: "",
      latitude: "",
      longitude: ""
    };
  }

  return {
    city: resource.ville || resource.address_city,
    depcode: resource.department_id,
    postcode: resource.code_postal || resource.address_zip_code || resource.codePostal,
    label: resource.address || resource.adresse || resource.ville || resource.address_city,
    latitude: resource.latitude,
    longitude: resource.longitude
  };
};

export { geocodeInitialValue };
