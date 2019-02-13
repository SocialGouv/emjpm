import styled from "styled-components";
import { AlertCircle } from "react-feather";
import * as React from "react";

import isOlderThanOneMonth from "../communComponents/checkDate";

const getColorFromDisponibilite = dispo => {
  if (dispo >= 1) {
    return "#f05659";
  } else if (dispo >= 0.85) {
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
      background: getColorFromDisponibilite(dispo / dispo_max)
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
class TableRowMandataire extends React.Component {
  state = {
    timer: "inline-block"
  };

  updateTimer = time => {
    this.setState({ timer: time });
  };

  render() {
    //date-fns
    let isLate = isOlderThanOneMonth(this.props.mandataire.updateMesure);
    const { type, etablissement, disponibilite, referent, dispo_max } = this.props.mandataire;
    return (
      <tr onClick={this.props.onClick} style={{ cursor: "pointer" }}>
        <Cell style={{ width: "100px" }}>
          <Circle
            style={{
              backgroundColor: getColorFromDisponibilite(disponibilite / dispo_max)
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
        <td style={{ fontSize: "0.8em", verticalAlign: "middle", textAlign: "center" }}>
          {!isLate && (
            <span
              className="d-inline-block"
              tabIndex="0"
              data-toggle="tooltip"
              title="Dernière mise à jour des données datant de plus de 30 jours."
            >
              <AlertCircle />
            </span>
          )}
        </td>
      </tr>
    );
  }
}

export default TableRowMandataire;
