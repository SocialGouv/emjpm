import styled from "styled-components";

export const Pill = styled.div`
  font-size: 18px;
  min-width: 80px;
  padding: 0 10px;
  height: 28px;
  line-height: 28px;
  border-radius: 2px;
  text-align: center;
  color: white;
  display: inline-block;
  margin-right: 10px;
  margin-top: 5px;
`;

export const PillDispo = ({ dispo, dispo_max }) => (
  <Pill
    style={{
      background: getColorFromDisponibilite(dispo_max - dispo)
    }}
  >
    {dispo || 0} / {dispo_max || 0}
  </Pill>
);

export const getColorFromDisponibilite = dispo => {
  if (dispo <= 0) {
    return "#f05659";
  } else if (dispo <= 5) {
    return "#eb9123";
  }
  return "#43b04a";
};

export default Pill;
