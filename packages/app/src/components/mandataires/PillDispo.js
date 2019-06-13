import { connect } from "react-redux";

import { Pill } from "..";

export const getColorFromDisponibilite = dispo => {
  if (dispo <= 0) {
    return "#f05659";
  } else if (dispo <= 5) {
    return "#eb9123";
  }
  return "#43b04a";
};

export const PillDispo = ({ mesures_en_cours, dispo_max }) => (
  <Pill
    style={{
      background: getColorFromDisponibilite(dispo_max - mesures_en_cours)
    }}
  >
    {mesures_en_cours || 0} / {dispo_max || 0}
  </Pill>
);

const PillDispoRedux = connect(state => ({
  lastUpdate: state.mesures.lastUpdate
}))(PillDispo);

export default PillDispoRedux;
