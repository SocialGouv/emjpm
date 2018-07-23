const getCenter = (state, postcodeMandataire) => {
  return state.lat
    ? [state.lat, state.lng]
    : postcodeMandataire[1]
      ? [postcodeMandataire[1], postcodeMandataire[0]]
      : [50.459441, 2.693963];
};

export default getCenter;
