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

export const PillDispo = ({ mandataireId, profiles }) => {
  const newMandataire =
    profiles && profiles.length === 0 ? profiles : profiles && profiles.filter(manda => manda.id === mandataireId)[0];

  console.log("profiles", profiles)
  console.log("newMandataire", newMandataire)

  const mesures_en_cours = newMandataire && newMandataire.mesures_en_cours;
  const dispo_max = newMandataire && newMandataire.dispo_max;
  return (
    <Pill
      style={{
        background: getColorFromDisponibilite(dispo_max - mesures_en_cours)
      }}
    >
      {mesures_en_cours || 0} / {dispo_max || 0}
    </Pill>
  );
};

const PillDispoRedux = connect(state => ({
  lastUpdate: state.mesures.lastUpdate,
  profiles: state.mandataire.profiles
}))(PillDispo);

export default PillDispoRedux;
