const getCenter = (state, coordonneesMandataire) => {
  return state.lat
    ? [state.lat, state.lng]
    : coordonneesMandataire[1]
      ? [coordonneesMandataire[1], coordonneesMandataire[0]]
      : [50.459441, 2.693963];
};

export default getCenter;
