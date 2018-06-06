import TableRowMesure from "../mandataireComponents/TableRowMesure";

const TableMesure = ({ rows, openModal }) => {
  return (
    <div className="col-lg-12" style={{ padding: "0px" }}>
      <table className="table responsive table-hover" style={{ boderTop: "0px" }}>
        <thead>
          {/*<style jsx>{`*/}
          {/*input {*/}
          {/*margin-bottom: 0 !important;*/}
          {/*}*/}
          {/*td {*/}
          {/*border: 1px solid #ade8ff !important;*/}
          {/*}*/}
          {/*`}</style>*/}
          <tr>
            <td
              style={{ width: "40%", textAlign: "left", color: "#696969", borderTopWidth: "0px" }}
              colSpan="2"
            >
              Date d'ouverture
            </td>

            <td
              style={{ width: "30%", textAlign: "left", color: "#696969", borderTopWidth: "0px" }}
            >
              Résidence du majeur
            </td>
            <td
              style={{ width: "30%", textAlign: "left", color: "#696969", borderTopWidth: "0px" }}
            >
              Type de mesure
            </td>
            <td
              style={{
                textAlign: "left",
                verticalAlign: "middle",
                width: 120,
                color: "#696969",
                borderTopWidth: "0px"
              }}
            >
              Genre
            </td>
            <td
              style={{ width: "30%", textAlign: "left", color: "#696969", borderTopWidth: "0px" }}
            >
              Age
            </td>
            <td
              style={{ width: "30%", textAlign: "left", color: "#696969", borderTopWidth: "0px" }}
            >
              Statut
            </td>
          </tr>
        </thead>
        <tbody>
          {rows.map(mesure => <TableRowMesure key={mesure.properties.tel} mesure={mesure} />)}
        </tbody>
      </table>
    </div>
  );
};
export default TableMesure;
