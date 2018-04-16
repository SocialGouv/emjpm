import TableRowMesure from "./TableRowMesure";
import MandatairesIndex from "../../pages/mandataires_index";
import MesureInput from "./MesureInput";

class TableMesure extends React.Component {
  state = {
    data: [],
    datamesure: [],
    currentMandataire: "",
    showResults: false
  };

  onClick = () => {
    const todayElements = document.getElementsByClassName("mesure_button");
    if (this.state.showResults === false) {
      this.setState({ showResults: true });
      todayElements.style.display = "none";
    } else {
      this.setState({ showResults: false });
    }
  };

  render() {
    return (
      <div className="container">
        <div className="col-lg-12">
          <br />
          <div className="row">
            <div>
              <br />
              <MesureInput updateMesure={this.props.updateMesure} />
            </div>
          </div>
        </div>
        <br />
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
                style={{ width: "20%", textAlign: "left", color: "#696969", borderTopWidth: "0px" }}
              >
                <b> Date d'ouverture </b>
              </td>

              <td
                style={{ width: "22%", textAlign: "left", color: "#696969", borderTopWidth: "0px" }}
              >
                <b>Résidence du majeur </b>
              </td>
              <td
                style={{ width: "20%", textAlign: "left", color: "#696969", borderTopWidth: "0px" }}
              >
                <b> Type de mesure </b>
              </td>
              <td
                style={{
                  textAlign: "left",
                  width: "10%",
                  color: "#696969",
                  borderTopWidth: "0px"
                }}
              >
                <b> Genre </b>
              </td>
              <td
                style={{ width: "10%", textAlign: "left", color: "#696969", borderTopWidth: "0px" }}
              >
                <b> Age </b>
              </td>
              <td
                style={{ width: "10%", textAlign: "left", color: "#696969", borderTopWidth: "0px" }}
              >
                <b> Statut </b>
              </td>
            </tr>
          </thead>
          <tbody>
            {this.props.rows && (this.props.rows.map(mesure => (
              <TableRowMesure  key={mesure.id} mesure={mesure} updateMesure={this.props.updateMesure}/>
            )))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TableMesure;
