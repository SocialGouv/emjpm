import ReactTable from "react-table";
import format from "date-fns/format";

import { Button, PromiseState } from "..";

import apiFetch from "../communComponents/Api";

const CellEditMesure = ({ row }) => {
  const getPromise = () => new Promise(resolve => setTimeout(resolve, 400));
  return <PromiseButton onClick={() => getPromise()}>Modifier</PromiseButton>;
};

const CellEndMesure = ({ row }) => {
  const getPromise = () => new Promise(resolve => setTimeout(resolve, 400));
  return <PromiseButton onClick={() => getPromise()}>Mettre fin au mandat</PromiseButton>;
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
    Header: "Modifier",
    Cell: row => <CellEditMesure row={row.row} />,
    width: 150,
    style: { textAlign: "center", alignSelf: "center" }
  },
  {
    Header: "Fin de mandat",
    Cell: row => <CellEndMesure row={row.row} />,
    width: 200,
    style: { textAlign: "center", alignSelf: "center" }
  }
];

const getMesures = () => apiFetch(`/mandataires/1/mesures`);

// client side pagination
class TableMesures extends React.Component {
  state = {
    data: [],
    loading: false
  };
  fetchData = (state, instance) => {
    console.log("fetchData");
    if (!this.state.loading) {
      this.setState({ loading: true }, () =>
        getMesures()
          .then(data => {
            console.log("data", data);
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
    return (
      <ReactTable
        style={{ backgroundColor: "white" }}
        columns={COLUMNS}
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

export default TableMesures;
