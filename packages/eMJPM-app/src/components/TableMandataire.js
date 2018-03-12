import TableRowMandataire from "./TableRowMandataire";

const TableMandataire = ({ rows, updateFilters, openModal }) => {
  return (
    <div className="row">
      <div className="offset-1 col-lg-10">
        <table
          className="table table-bordered table-striped responsive table-hover"
          style={{ tableLayout: "fixed" }}
        >
          <thead>
            <style jsx>{`
              input {
                margin-bottom: 0 !important;
              }
              td {
                border: 1px solid #ade8ff !important;
              }
            `}</style>
            <tr style={{ backgroundColor: "#c4eeffa8" }}>
              <td style={{ width: 180,textAlign: "left" }}>
                <select
                  id="type"
                  className="custom-select mr-sm-2"
                  style={{ marginLeft: 0, textAlign: "left" }}
                  onChange={e => updateFilters({ searchType: e.target.value })}
                >
                  <option value="">Type MJPM</option>
                  <option value="preposes">Préposés</option>
                  <option value="prives">Individuels</option>
                  <option value="services">Services</option>
                </select>
              </td>

              <td style={{ width: 200 }}>
                <input
                  type={"text"}
                  className="form-control mb-2"
                  style={{ textAlign: "left" }}
                  placeholder={"Lieux"}
                  onChange={e => updateFilters({ searchVille: e.target.value })}
                />
              </td>
              <td>
                <input
                  type={"text"}
                  style={{ textAlign: "left" }}
                  className="form-control mb-2"
                  placeholder={"Identité"}
                  onChange={e => updateFilters({ searchNom: e.target.value })}
                />
              </td>
              <td
                style={{
                  textAlign: "center",
                  verticalAlign: "middle",
                  width: 120
                }}
              >
                Disponibilite
              </td>
              {/*<td*/}
                {/*style={{*/}
                  {/*textAlign: "center",*/}
                  {/*verticalAlign: "middle",*/}
                  {/*width: 150*/}
                {/*}}*/}
              {/*>*/}
                {/*Contact*/}
              {/*</td>*/}
              <td style={{ width: 40 }} />
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
    </div>
  );
};
export default TableMandataire;
