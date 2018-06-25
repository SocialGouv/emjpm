import styled from "styled-components";

const getColorFromDisponibilite = dispo => {
  if (dispo <= 0) {
    return "#f05659";
  } else if (dispo <= 5) {
    return "#eb9123";
  }
  return "#43b04a";
};

const Cell = ({ style, title, children }) => (
  <td
    className="pagination-centered"
    style={{ fontSize: "0.8em", textAlign: "left", verticalAlign: "middle", ...style }}
    title={title}
  >
    {children}
  </td>
);

export const PillDispo = ({ dispo, dispo_max }) => (
  <div
    style={{
      margin: "0 auto",
      width: 100,
      lineHeight: "40px",
      borderRadius: "5px",
      textAlign: "center",
      color: "white",
      background: getColorFromDisponibilite(dispo_max - dispo)
    }}
  >
    {dispo} / {dispo_max}
  </div>
);

export const Circle = styled.div`
  line-height: 40px;
  font-size: 0.7em;
  height: 40px;
  width: 40px;
  text-align: center;
  color: white;
  border-radius: 50%;
  display: inline-block;
`;

const TableRowMandataire = ({ mandataire, onClick }) => {
  const {
    type,
    etablissement,
    disponibilite,
    referent,
    dispo_max
  } = mandataire;
  return (
    <tr onClick={onClick} style={{ cursor: "pointer" }}>
      <Cell style={{ width: "100px" }}>
        <Circle
          style={{
            backgroundColor: getColorFromDisponibilite(dispo_max - disponibilite)
          }}
        >
          {type.toUpperCase().substr(0, 1)}
        </Circle>
      </Cell>
      <Cell style={{ verticalAlign: "middle" }}>
        <b>{etablissement || referent}</b>
        <br /> <div style={{ color: "#cccccc" }}>{type.toUpperCase()} </div>
      </Cell>
      <td style={{ fontSize: "0.8em", verticalAlign: "middle", textAlign: "center" }}>
        <PillDispo dispo={disponibilite} dispo_max={dispo_max} />
      </td>
    </tr>
  );
};

export default TableRowMandataire;
