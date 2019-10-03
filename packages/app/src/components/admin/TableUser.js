import format from "date-fns/format";
import { stringify } from "query-string";
import React from "react";
import ReactTable from "react-table";
import ToggleState from "../common/ToggleState";
import { default as apiFetch, updateUser } from "../communComponents/Api";
import SearchButton from "../communComponents/SearchButton";

const CellActive = ({ active }) => {
  return (
    <span>
      <span
        style={{
          color: active ? "#57d500" : "#ff2e00"
        }}
      >
        &#x25cf;
      </span>
    </span>
  );
};

CellActive.displayName = "CellActive";

const CellAction = ({ row: { id, active } }) => (
  <ToggleState
    getPromise={active =>
      updateUser({
        id,
        active
      })
    }
    active={active}
    render={({ active, toggle }) => {
      return (
        <SearchButton
          onClick={toggle}
          error={active}
          data-cy="UserCellAction"
          style={{ textAlign: "center", fontSize: "0.8em" }}
          type="submit"
        >
          {(active && "Désactiver") || "Activer"}
        </SearchButton>
      );
    }}
  />
);

const COLUMNS = [
  {
    Header: "ID",
    accessor: "id",
    width: 50,
    show: false,
    style: { textAlign: "center" }
  },
  {
    Header: "Actif",
    accessor: "active",
    Cell(row) {
      return <CellActive active={row.value} />;
    },
    width: 70,
    show: false, // the button show more accurate status
    style: { textAlign: "center" }
  },
  {
    Header: "Nom",
    id: "nom",
    accessor: d => ((d.nom || "") + " " + (d.prenom || "")).trim(),
    style: { alignSelf: "center" }
  },
  {
    Header: "Email",
    id: "email",
    accessor: "email",
    width: 100,
    style: { textAlign: "center", alignSelf: "center" }
  },
  {
    Header: "Cabinet",
    id: "cabinet",
    accessor: "cabinet",
    width: 100,
    style: { textAlign: "center", alignSelf: "center" }
  },

  {
    Header: "Type",
    id: "type",
    width: 100,
    accessor: d => d.type.toUpperCase(),
    style: { textAlign: "center", alignSelf: "center" }
  },
  {
    Header: "Création",
    id: "created_at",
    accessor: d => format(d.created_at, "DD/MM/YYYY"),
    width: 120,
    style: { textAlign: "center", alignSelf: "center" }
  },
  {
    Header: "Connexion",
    id: "last_login",
    accessor: d => (d.last_login ? format(d.last_login, "DD/MM/YYYY") : "-"),
    width: 120,
    style: { textAlign: "center", alignSelf: "center" }
  },
  {
    Header: "Activer",
    Cell(row) {
      return <CellAction row={row.row} />;
    },
    width: 120,
    style: { textAlign: "center", alignSelf: "center" }
  }
];

// client side pagination
class TableUser extends React.Component {
  state = {
    data: [],
    loading: true
  };
  fetchData = () => {
    const url = `/admin/${this.props.type}?${stringify(this.props.filters)}`;
    this.setState({ loading: true }, () =>
      apiFetch(url).then(res => {
        this.setState({
          data: res,
          loading: false
        });
      })
    );
  };
  render() {
    const { data, loading } = this.state;
    const { hideColumns } = this.props;
    return (
      <ReactTable
        style={{ backgroundColor: "white" }}
        columns={COLUMNS.filter(col => hideColumns.indexOf(col.id) === -1)}
        noDataText="Aucun user ici..."
        manual
        showPagination={false}
        data={data}
        loading={loading}
        loadingText="Chargement des users..."
        defaultSorted={[
          {
            id: "created_at",
            desc: false
          }
        ]}
        onFetchData={this.fetchData}
        className="-striped -highlight"
      />
    );
  }
}

export default TableUser;
