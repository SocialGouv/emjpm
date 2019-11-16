import format from "date-fns/format";
import PropTypes from "prop-types";
import React from "react";
import Form from "react-jsonschema-form";
import { connect } from "react-redux";
import ReactTable from "react-table";
import { bindActionCreators } from "redux";
import { show } from "redux-modal";

import { Button } from "..";

// bouton connecté à redux-modal.show pour EditMesure

const CellEditMesureRedux = connect(
  null,
  dispatch => bindActionCreators({ show }, dispatch)
)(({ row, show }) => (
  <Button
    data-cy="button-edit-mesure"
    onClick={() =>
      show("EditMesure", { formData: row.original, mandataire_id: row.original.mandataire_id })
    }
  >
    Modifier
  </Button>
));

// bouton connecté à redux-modal.show pour CloseMesure
const CellCloseMesureRedux = connect(
  null,
  dispatch => bindActionCreators({ show }, dispatch)
)(({ row, show }) => (
  <Button
    data-cy="button-close-mesure"
    error
    onClick={() =>
      show("CloseMesure", { id: row.original.id, mandataire_id: row.original.mandataire_id })
    }
  >
    Mettre fin au mandat
  </Button>
));

const CellCloseMesureAttenteRedux = connect(
  null,
  dispatch => bindActionCreators({ show }, dispatch)
)(({ row, show }) => (
  <Button
    data-cy="button-close-mesure"
    error
    onClick={() =>
      show("CloseMesureAttente", { id: row.original.id, mandataire_id: row.original.mandataire_id })
    }
  >
    Supprimer la mesure
  </Button>
));

// bouton connecté à redux-modal.show pour ReactivateMesure
const CellReactivateMesureRedux = connect(
  null,
  dispatch => bindActionCreators({ show }, dispatch)
)(({ row, show }) => (
  <Button
    data-cy="button-reactivate-mesure"
    onClick={() =>
      show("ReactivateMesure", { id: row.original.id, mandataire_id: row.original.mandataire_id })
    }
  >
    Réactiver la mesure
  </Button>
));

const CellValidationMesureRedux = connect(
  null,
  dispatch => bindActionCreators({ show }, dispatch)
)(({ row, show }) => (
  <Button
    data-cy="button-attente-mesure"
    onClick={() =>
      show("ValiderMesureEnAttente", {
        formData: row.original,
        mandataire_id: row.original.mandataire_id
      })
    }
  >
    Valider
  </Button>
));

const concat = (...strings) =>
  strings
    .map(s => ("" + s).trim())
    .filter(Boolean)
    .join(" ");

const COLUMNS = [
  {
    Header: "ID",
    accessor: "id",
    id: "id",
    show: false,
    style: { textAlign: "center", verticalAlign: "middle" },
    width: 50
  },
  {
    Cell(row) {
      return (
        <div>
          {format(row.row.date_ouverture, "D MMMM YYYY", { locale: require("date-fns/locale/fr") })}
        </div>
      );
    },
    Header: "Date de décision",
    accessor: d => format(d.date_ouverture, "YYYY-MM-DD"),
    id: "date_ouverture",
    style: { alignSelf: "center", textAlign: "center" },
    width: 140
  },
  {
    Cell(row) {
      return (
        <div>
          {format(row.row.date_demande, "D MMMM YYYY", { locale: require("date-fns/locale/fr") })}
        </div>
      );
    },
    Header: "Date de réservation",
    accessor: d => format(d.created_at, "YYYY-MM-DD"),
    id: "date_demande",
    style: { alignSelf: "center", textAlign: "center" },
    width: 300
  },
  {
    Header: "Professionnel",
    accessor: d => (d.manda === "" ? d.nom : d.manda),
    id: "professionnel",
    style: { alignSelf: "center", textAlign: "center" }
  },
  {
    Header: "Mandataire",
    accessor: d => d.mandataire_id,
    id: "mandataire_id",
    style: { alignSelf: "center", textAlign: "center" }
  },
  {
    Header: "Tribunal d'instance",
    accessor: d => d.etablissement,
    id: "ti",
    style: { alignSelf: "center", textAlign: "center" }
  },
  {
    Header: "Résidence du majeur",
    accessor: d => concat(d.code_postal ? d.code_postal : "", d.ville ? d.ville.toUpperCase() : ""),
    id: "residence",
    style: { alignSelf: "center" }
  },
  {
    Header: "Type de mesure",
    accessor: d => d.type,
    id: "type",
    style: { alignSelf: "center", textAlign: "center" },
    width: 150
  },
  {
    Header: "Genre",
    accessor: d => d.civilite,
    id: "civilite",
    style: { alignSelf: "center", textAlign: "center" },
    width: 70
  },
  {
    Cell(row) {
      return <div>{(row.row.annee && format(row.row.annee, "YYYY")) || null}</div>;
    },
    Header: "Année de naissance",
    accessor: "annee",
    id: "annee",
    style: { alignSelf: "center", textAlign: "center" },
    width: 80
  },
  {
    Header: "Référence de la mesure",
    accessor: "numero_dossier",
    id: "numero_dossier",
    style: { alignSelf: "center", textAlign: "center" },
    width: 80
  },
  {
    Header: "Numéro RG",
    accessor: d => d.numero_rg,
    id: "numero_rg",
    style: { alignSelf: "center", textAlign: "center" },
    width: 75
  },
  {
    Cell(row) {
      return (
        <div>
          {format(row.row.extinction, "DD/MM/YYYY", { locale: require("date-fns/locale/fr") })}
        </div>
      );
    },
    Header: "Extinction",
    accessor: d => format(d.extinction, "YYYY-MM-DD"),
    id: "extinction",
    style: { alignSelf: "center", textAlign: "center" },
    width: 100
  },
  {
    Header: "Fin de mandat",
    accessor: d => d.reason_extinction,
    id: "reason_fin_de_mandat",
    style: { alignSelf: "center", textAlign: "center" },
    width: 75
  },
  {
    Cell(row) {
      return <CellEditMesureRedux row={row} />;
    },
    Header: "Modifier",
    id: "modifier",
    style: { alignSelf: "center", textAlign: "center" },
    width: 150
  },
  {
    Header: "Cabinet",
    accessor: d => d.cabinet,
    id: "cabinet",
    style: { alignSelf: "center", textAlign: "center" },
    width: 60
  },
  {
    Header: "Statut",
    accessor: d => d.status,
    id: "status",
    style: { alignSelf: "center", textAlign: "center" }
  },
  {
    Cell(row) {
      return <CellCloseMesureRedux row={row} />;
    },
    Header: "Fin de mandat",
    id: "fin-mandat",
    style: { alignSelf: "center", textAlign: "center" },
    width: 200
  },
  {
    Cell(row) {
      return <CellCloseMesureAttenteRedux row={row} />;
    },
    Header: "Supprimer la mesure",
    id: "fin-mandat-attente",
    style: { alignSelf: "center", textAlign: "center" },
    width: 200
  },
  {
    Cell(row) {
      return <CellReactivateMesureRedux row={row} />;
    },
    Header: "Réactiver",
    id: "reactiver",
    style: { alignSelf: "center", textAlign: "center" },
    width: 200
  },
  {
    Cell(row) {
      return <CellValidationMesureRedux row={row} />;
    },
    Header: "Valider",
    id: "valider",
    style: { alignSelf: "center", textAlign: "center" },
    width: 200
  }
];

const schema = {
  properties: {
    search: {
      type: "string"
    }
  },
  type: "object"
};

const uiSchema = {
  search: {
    classNames: "input__search",
    "ui:options": {
      label: false
    },
    "ui:placeholder": "Référence de la mesure"
  }
};

class TableMesures extends React.Component {
  state = {
    data: [],
    loading: false,
    newData: []
  };
  fetchData = () => {
    if (!this.state.loading) {
      this.setState({ loading: true }, () =>
        this.props
          .fetch()
          .then(data => {
            this.setState({
              data,
              loading: false
            });
          })
          .catch(error => {
            /* eslint-disable no-console */
            console.error(error);
            /* eslint-enable no-console */
          })
      );
    }
  };
  componentDidUpdate(prevProps) {
    // hack to force reload when some redux state change
    if (prevProps.lastUpdate !== this.props.lastUpdate) {
      this.fetchData();
    }
  }
  componentDidMount() {
    this.fetchData();
  }

  onChange = formData => {
    const newData = this.state.data.filter(
      datum => datum.numero_dossier && datum.numero_dossier.includes(formData.formData.search)
    );
    this.setState({
      newData: newData
    });
  };

  render() {
    const { data, loading, newData } = this.state;
    const { hideColumns } = this.props;
    return (
      <>
        <div style={{ textAlign: "right" }}>
          <Form
            schema={schema}
            uiSchema={uiSchema}
            onSubmit={this.onChange}
            style={{
              display: "flex",
              flexDirection: "row",
              textAlign: "right"
            }}
          >
            <Button
              type="submit"
              className="btn btn-success"
              style={{ flex: "0 1 auto", height: "35px" }}
            >
              Filtrer
            </Button>
          </Form>
        </div>
        <ReactTable
          style={{ backgroundColor: "white", minHeight: 500 }}
          columns={COLUMNS.filter(col => hideColumns.indexOf(col.id) === -1)}
          noDataText="Aucune mesure ici..."
          showPagination={false}
          minRows={0}
          pageSize={1000}
          data={(newData && newData.length && newData) || data}
          sortable={true}
          multiSort={false}
          defaultSorted={[
            {
              desc: true,
              id: "date_ouverture"
            }
          ]}
          loading={loading}
          loadingText="Chargement des mesures..."
          className="-striped -highlight"
        />
      </>
    );
  }
}

TableMesures.propTypes = {
  fetch: PropTypes.func.isRequired,
  hideColumns: PropTypes.array
};
TableMesures.defaultProps = {
  hideColumns: []
};

const mapStateToProps = state => ({
  // /!\ todo : hack
  // lastUpdate is updated when some mesure is modified so we can refresh the table
  lastUpdate: state.mandataire.lastUpdate
});
export default connect(mapStateToProps)(TableMesures);
