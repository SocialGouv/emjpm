import * as React from "react";
import PropTypes from "prop-types";
import ReactTable from "react-table";
import styled from "styled-components";
import { AlertCircle } from "react-feather";

//Redux
import { show } from "redux-modal";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { openFichMandataireModal } from "./actions/mandataire";

import isOlderThanOneMonth from "../communComponents/checkDate";

const getColorFromDisponibilite = dispo => {
  if (dispo >= 1) {
    return "#f05659";
  } else if (dispo >= 0.85) {
    return "#eb9123";
  }
  return "#43b04a";
};

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

const CellMandataireRedux = connect(
  null,
  dispatch => bindActionCreators({ show, openFichMandataireModal }, dispatch)
)(({ row, show, children, openFichMandataireModal }) => (
  <td
    data-cy="button-attente-mesure"
    onClick={() => {
      openFichMandataireModal(row.original);
      show("FicheMandataireModal", { currentMandataire: row.original });
    }}
  >
    {children}
  </td>
));

const Cell = ({ style, title, children, row }) => (
    <CellMandataireRedux
        row={row}
        className="pagination-centered"
        style={{ fontSize: "0.8em", textAlign: "left", verticalAlign: "middle", ...style }}
        title={title}
    >
        {children}
    </CellMandataireRedux>
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

const COLUMNS = [
  {
    Header: "ID",
    id: "id",
    accessor: "id",
    width: 20,
    show: false,
    style: { textAlign: "center", verticalAlign: "middle" }
  },
  {
    Header: "mesures_max",
    id: "dispo_max",
    accessor: "dispo_max",
    width: 20,
    show: false,
    style: { textAlign: "center", verticalAlign: "middle" }
  },
  {
    Header: "mesures_en_cours",
    id: "mesures_en_cours",
    accessor: "mesures_en_cours",
    width: 20,
    show: false,
    style: { textAlign: "center", verticalAlign: "middle" }
  },
  {
    Header: "Identité",
    id: "identity",
    width: 60,
    accessor: d => d.type,
    Cell: row => (
      <Cell  row={row} style={{ width: "100px" }}>
        <Circle
          style={{
            backgroundColor: getColorFromDisponibilite(row.row.mesures_en_cours / row.row.dispo_max)
          }}
        >
          {row.row.identity.toUpperCase().substr(0, 1)}
        </Circle>
      </Cell>
    ),
    style: { textAlign: "center", alignSelf: "center" }
  },
  {
    Header: "",
    id: "etablissement",
    width: 120,
    accessor: d => d.etablissement,
    Cell: row => (
      <Cell  row={row} style={{ verticalAlign: "middle" }}>
        <b>{row.row.etablissement}</b>
        <br /> <div style={{ color: "#cccccc" }}>{row.row.identity.toUpperCase()} </div>
      </Cell>
    ),
    style: { textAlign: "center", alignSelf: "center" }
  },
  {
    Header: "En cours",
    id: "en_cours",
    accessor: d => d.mesures_en_cours / d.dispo_max,
    Cell: row => (
      <CellMandataireRedux
        row={row}
        style={{ fontSize: "0.8em", verticalAlign: "middle", textAlign: "center" }}
      >
        <PillDispo dispo={row.row.mesures_en_cours} dispo_max={row.row.dispo_max} />
      </CellMandataireRedux>
    ),
    style: { textAlign: "center", alignSelf: "center" }
  },
  {
    Header: "",
    id: "residence",
    accessor: d => d.date_mesure_update,
    Cell: row => (
      <CellMandataireRedux  row={row} style={{ fontSize: "0.8em", verticalAlign: "middle", textAlign: "center" }}>
        {isOlderThanOneMonth(row.row.residence.slice(0, 10)) && (
          <span
            className="d-inline-block"
            tabIndex="0"
            data-toggle="tooltip"
            title="Dernière mise à jour des données datant de plus de 30 jours."
          >
            <AlertCircle />
          </span>
        )}
      </CellMandataireRedux>
    ),
    style: { alignSelf: "center" }
  }
];

class TableTi extends React.Component {
  render() {
    const { hideColumns, rows } = this.props;
    return (
      <ReactTable
        style={{ backgroundColor: "white", minHeight: 900 }}
        columns={COLUMNS.filter(col => hideColumns.indexOf(col.id) === -1)}
        noDataText="Aucune mesure ici..."
        showPagination={false}
        minRows={0}
        pageSize={1000}
        data={rows}
        sortable={true}
        multiSort={false}
        filterable={false}
        defaultSorted={[
          {
            id: "en_cours",
            desc: false
          }
        ]}
        loadingText="Chargement des mandataires..."
        className="-striped -highlight"
      />
    );
  }
}

TableTi.propTypes = {
  hideColumns: PropTypes.array
};
TableTi.defaultProps = {
  hideColumns: []
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { onClick: ({ currentMandataire }) => openFichMandataireModal(currentMandataire) },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(TableTi);
