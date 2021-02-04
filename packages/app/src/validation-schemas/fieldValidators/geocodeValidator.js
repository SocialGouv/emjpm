function validateGeocode(value) {
  if (!value) {
    return false;
  }
  const { city, depcode, latitude, longitude, label } = value;
  if (!city || !depcode || !latitude || !longitude || !label) {
    return false;
  }
  return true;
}

export { validateGeocode };
