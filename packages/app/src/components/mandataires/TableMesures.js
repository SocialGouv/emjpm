import React from "react";
import { show } from "redux-modal";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ReactTable from "react-table";
import format from "date-fns/format";

import { Button } from "..";
import Form from "react-jsonschema-form";

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
    id: "id",
    accessor: "id",
    width: 50,
    show: false,
    style: { textAlign: "center", verticalAlign: "middle" }
  },
  {
    Header: "Date de décision",
    id: "date_ouverture",
    width: 140,
    accessor: d => format(d.date_ouverture, "YYYY-MM-DD"),
    Cell(row) {
      return (
        <div>
          {format(row.row.date_ouverture, "D MMMM YYYY", { locale: require("date-fns/locale/fr") })}
        </div>
      );
    },
    style: { textAlign: "center", alignSelf: "center" }
  },
  {
    Header: "Date de réservation",
    id: "date_demande",
    width: 300,
    accessor: d => format(d.created_at, "YYYY-MM-DD"),
    Cell(row) {
      return (
        <div>
          {format(row.row.date_demande, "D MMMM YYYY", { locale: require("date-fns/locale/fr") })}
        </div>
      );
    },
    style: { textAlign: "center", alignSelf: "center" }
  },
  {
    Header: "Professionnel",
    id: "professionnel",
    accessor: d => (d.manda === "" ? d.nom : d.manda),
    style: { textAlign: "center", alignSelf: "center" }
  },
  {
    Header: "Mandataire",
    id: "mandataire_id",
    accessor: d => d.mandataire_id,
    style: { textAlign: "center", alignSelf: "center" }
  },
  {
    Header: "Tribunal d'instance",
    id: "ti",
    accessor: d => d.etablissement,
    style: { textAlign: "center", alignSelf: "center" }
  },
  {
    Header: "Résidence du majeur",
    id: "residence",
    accessor: d => concat(d.code_postal ? d.code_postal : "", d.ville ? d.ville.toUpperCase() : ""),
    style: { alignSelf: "center" }
  },
  {
    Header: "Type de mesure",
    id: "type",
    width: 150,
    accessor: d => d.type,
    style: { textAlign: "center", alignSelf: "center" }
  },
  {
    Header: "Genre",
    id: "civilite",
    width: 70,
    accessor: d => d.civilite,
    style: { textAlign: "center", alignSelf: "center" }
  },
  {
    Header: "Année de naissance",
    id: "annee",
    width: 80,
    accessor: "annee",
    Cell(row) {
      return <div>{(row.row.annee && format(row.row.annee, "YYYY")) || null}</div>;
    },
    style: { textAlign: "center", alignSelf: "center" }
  },
  {
    Header: "Référence de la mesure",
    id: "numero_dossier",
    width: 80,
    accessor: "numero_dossier",
    style: { textAlign: "center", alignSelf: "center" }
  },
  {
    Header: "Numéro RG",
    id: "numero_rg",
    width: 75,
    accessor: d => d.numero_rg,
    style: { textAlign: "center", alignSelf: "center" }
  },
  {
    Header: "Extinction",
    id: "extinction",
    width: 100,
    accessor: d => format(d.extinction, "YYYY-MM-DD"),
    Cell(row) {
      return (
        <div>
          {format(row.row.extinction, "DD/MM/YYYY", { locale: require("date-fns/locale/fr") })}
        </div>
      );
    },
    style: { textAlign: "center", alignSelf: "center" }
  },
  {
    Header: "Fin de mandat",
    id: "reason_fin_de_mandat",
    width: 75,
    accessor: d => d.reason_extinction,
    style: { textAlign: "center", alignSelf: "center" }
  },
  {
    Header: "Modifier",
    id: "modifier",
    Cell(row) {
      return <CellEditMesureRedux row={row} />;
    },
    width: 150,
    style: { textAlign: "center", alignSelf: "center" }
  },
  {
    Header: "Cabinet",
    id: "cabinet",
    width: 60,
    accessor: d => d.cabinet,
    style: { textAlign: "center", alignSelf: "center" }
  },
  {
    Header: "Statut",
    id: "status",
    accessor: d => d.status,
    style: { textAlign: "center", alignSelf: "center" }
  },
  {
    Header: "Fin de mandat",
    id: "fin-mandat",
    Cell(row) {
      return <CellCloseMesureRedux row={row} />;
    },
    width: 200,
    style: { textAlign: "center", alignSelf: "center" }
  },
  {
    Header: "Supprimer la mesure",
    id: "fin-mandat-attente",
    Cell(row) {
      return <CellCloseMesureAttenteRedux row={row} />;
    },
    width: 200,
    style: { textAlign: "center", alignSelf: "center" }
  },
  {
    Header: "Réactiver",
    id: "reactiver",
    Cell(row) {
      return <CellReactivateMesureRedux row={row} />;
    },
    width: 200,
    style: { textAlign: "center", alignSelf: "center" }
  },
  {
    Header: "Valider",
    id: "valider",
    Cell(row) {
      return <CellValidationMesureRedux row={row} />;
    },
    width: 200,
    style: { textAlign: "center", alignSelf: "center" }
  }
];

const schema = {
  type: "object",
  properties: {
    search: {
      type: "string"
    }
  }
};

const uiSchema = {
  search: {
    "ui:placeholder": "Référence de la mesure",
    "ui:options": {
      label: false
    },
    classNames: "input__search"
  }
};

class TableMesures extends React.Component {
  state = {
    data: [],
    newData: [],
    loading: false
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
              textAlign: "right",
              display: "flex",
              flexDirection: "row"
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
              id: "date_ouverture",
              desc: true
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
