import PropTypes from "prop-types";

import ReactTable from "react-table";
import format from "date-fns/format";

import { Button, PromiseState } from "..";

const CellEditMesure = ({ row }) => {
  const getPromise = () => new Promise(resolve => setTimeout(resolve, 400));
  return <PromiseButton onClick={() => getPromise()}>Modifier</PromiseButton>;
};

const CellEndMesure = ({ row }) => {
  const getPromise = () => new Promise(resolve => setTimeout(resolve, 400));
  return <PromiseButton onClick={() => getPromise()}>Mettre fin au mandat</PromiseButton>;
};

const CellReactivateMesure = ({ row }) => {
  const getPromise = () => new Promise(resolve => setTimeout(resolve, 400));
  return <PromiseButton onClick={() => getPromise()}>Réactiver la mesure</PromiseButton>;
};

const PromiseButton = ({ onClick, className, style, error, children }) => {
  const MyButton = ({ children, disabled }) => (
    <Button className={className} style={style} disabled={disabled} error={error}>
      {children}
    </Button>
  );
  return (
    <PromiseState
      onClick={onClick}
      render={({ status }) => {
        return (
          (status === "idle" && <MyButton>{children}</MyButton>) ||
          (status === "loading" && <MyButton disabled>{children}</MyButton>) ||
          (status === "success" && <MyButton>{children}</MyButton>) ||
          (status === "error" && <MyButton error>⚠️ Erreur</MyButton>)
        );
      }}
    />
  );
};

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
    width: 120,
    accessor: d => format(d.date_ouverture, "DD/MM/YYYY"),
    style: { textAlign: "center", alignSelf: "center" }
  },
  {
    Header: "Résidence du majeur",
    id: "residence",
    width: 200,
    accessor: d => concat(d.code_postal, d.ville.toUpperCase()),
    style: { alignSelf: "center" }
  },
  {
    Header: "Type de mesure",
    id: "type",
    accessor: d => d.type,
    style: { textAlign: "center", alignSelf: "center" }
  },
  {
    Header: "Genre",
    id: "civilite",
    width: 80,
    accessor: d => d.civilite,
    style: { textAlign: "center", alignSelf: "center" }
  },
  {
    Header: "Naissance",
    id: "annee",
    width: 100,
    accessor: d => d.annee.substring(0, 4),
    style: { textAlign: "center", alignSelf: "center" }
  },
  {
    Header: "Extinction",
    id: "extinction",
    width: 100,
    accessor: d => d.extinction && d.extinction.slice(0, 10),
    style: { textAlign: "center", alignSelf: "center" }
  },
  {
    Header: "Modifier",
    id: "modifier",
    Cell: row => <CellEditMesure row={row.row} />,
    width: 150,
    style: { textAlign: "center", alignSelf: "center" }
  },
  {
    Header: "Fin de mandat",
    id: "fin-mandat",
    Cell: row => <CellEndMesure row={row.row} />,
    width: 200,
    style: { textAlign: "center", alignSelf: "center" }
  },
  {
    Header: "Réactiver",
    id: "reactiver",
    Cell: row => <CellReactivateMesure row={row.row} />,
    width: 200,
    style: { textAlign: "center", alignSelf: "center" }
  }
];

// client side pagination
class TableMesures extends React.Component {
  state = {
    data: [],
    loading: false
  };
  fetchData = (state, instance) => {
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
          .catch(console.log)
      );
    }
  };
  render() {
    const { data, loading } = this.state;
    const { hideColumns } = this.props;
    return (
      <ReactTable
        style={{ backgroundColor: "white" }}
        columns={COLUMNS.filter(col => hideColumns.indexOf(col.id) === -1)}
        noDataText="Aucune mesure ici..."
        showPagination={false}
        data={data}
        loading={loading}
        loadingText="Chargement des mesures..."
        onFetchData={this.fetchData}
        className="-striped -highlight"
      />
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
export default TableMesures;
