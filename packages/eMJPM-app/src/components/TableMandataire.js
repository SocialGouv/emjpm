import TableRowMandataire from "./TableRowMandataire";

const TableMandataire = ({ rows, updateFilters, openModal }) => {
  return (
      <div className="col-lg-12" style={{padding: "0px"}}>
        <table
          className="table responsive table-hover"
          style={{ boderTop: "0px" }}
        >
          <thead >
            {/*<style jsx>{`*/}
              {/*input {*/}
                {/*margin-bottom: 0 !important;*/}
              {/*}*/}
              {/*td {*/}
                {/*border: 1px solid #ade8ff !important;*/}
              {/*}*/}
            {/*`}</style>*/}
            <tr >
              <td style={{ width: "40%",textAlign: "left" ,color: "#696969",borderTopWidth: "0px"}} colSpan="2" >
                Nom ou établissement
              </td>

              <td style={{ width: "30%",textAlign: "left",color: "#696969",borderTopWidth: "0px" }}>
                Code Postal et Ville
              </td>
              <td style={{ width: "30%",textAlign: "left",color: "#696969",borderTopWidth: "0px" }}>
                Spécialités
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
                Mesures en cours
              </td>
            </tr>
          </thead>
          <tbody>
            {rows.map(mandataire => (
              <TableRowMandataire
                key={mandataire.properties.tel}
                mandataire={mandataire}
                updateFilters={this.updateFilters}
                onClick={() => openModal(mandataire)}
              />
            ))}
          </tbody>
        </table>
      </div>
  );
};
export default TableMandataire;
