import TableRowMandataire from "./TableRowMandataire";

const TableMandataire = ({ rows, openModal, updateFilters }) => {
  return (
    <div className="col-12" style={{ padding: "0px" }}>
      <div
        className="custom-control custom-radio custom-control-inline"
        style={{ marginLeft: "20px" }}
      >
        <label style={{ cursor: "pointer", width: "60px" }} htmlFor="customRadioInline1">
          <input
            type="radio"
            id="customRadioInline1"
            name="customRadioInline"
            style={{ margin: "5px" }}
            label="Individuels"
            value="Individuel"
            onClick={e => updateFilters({ searchType: e.target.value })}
          />Individuels
        </label>
      </div>
      <div className="custom-control custom-radio custom-control-inline">
        <label style={{ cursor: "pointer", width: "60px" }} htmlFor="customRadioInline2">
          <input
            type="radio"
            id="customRadioInline2"
            name="customRadioInline"
            style={{ margin: "5px" }}
            label="Préposés"
            value="Prepose"
            onClick={e => updateFilters({ searchType: e.target.value })}
          />Préposés
        </label>
      </div>
      <div className="custom-control custom-radio custom-control-inline">
        <label style={{ cursor: "pointer", width: "70px" }} htmlFor="customRadioInline3">
          <input
            type="radio"
            id="customRadioInline3"
            name="customRadioInline"
            style={{ margin: "5px" }}
            label="Services"
            value="Service"
            onClick={e => updateFilters({ searchType: e.target.value })}
          />Services
        </label>
        <label style={{ cursor: "pointer", width: "30px" }} htmlFor="customRadioInline2">
          <input
            type="radio"
            id="customRadioInline4"
            name="customRadioInline"
            style={{ margin: "5px" }}
            label="Tous"
            defaultChecked={true}
            value="Tous"
            onClick={e => updateFilters({ searchType: "" })}
          />Tous
        </label>
      </div>
      <table className="table responsive table-hover" style={{ boderTop: "0px" }}>
        <thead>
          <tr>
            <td
              style={{ width: "40%", textAlign: "left", color: "#696969", borderTopWidth: "0px" }}
              colSpan="2"
            >
              Identité{" "}
            </td>
            <td
              style={{
                textAlign: "center",
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
          {rows &&
            rows.map(mandataire => (
              <TableRowMandataire
                key={mandataire.telephone}
                mandataire={mandataire}
                onClick={() => openModal(mandataire)}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};
export default TableMandataire;
