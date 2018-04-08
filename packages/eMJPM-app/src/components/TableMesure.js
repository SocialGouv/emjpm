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
            const todayElements = document.getElementsByClassName('mesure_button');
            if (this.state.showResults === false){
            this.setState({ showResults: true });
            todayElements.style.display = 'none';
            } else {
                this.setState({ showResults: false });
            }
        }



      render() {



  return (


<div>
      <div className="col-lg-12" style={{padding: "0px"}}>
          <br />
          <div className="row">
          <button type="button" className="btn btn-success mesure_button" onClick={this.onClick} style={{align: "left"}}>Ouvrir une nouvelle mesure</button>
                 <div>
                     <br />
                  { this.state.showResults ? <MesureInput /> : null }
              </div>
          </div>

          </div>
          <br />
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
              <td style={{ width: "20%",textAlign: "left" ,color: "#696969",borderTopWidth: "0px"}}>
                  <b> Date d'ouverture </b>
              </td>

              <td style={{ width: "20%",textAlign: "left",color: "#696969",borderTopWidth: "0px" }}>
                  <b>Résidence du majeur </b>
              </td>
              <td style={{ width: "20%",textAlign: "left",color: "#696969",borderTopWidth: "0px" }}>
                  <b>  Type de mesure </b>
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
                <td style={{ width: "10%",textAlign: "left",color: "#696969",borderTopWidth: "0px" }}>
                    <b>   Age </b>
                </td>
                <td style={{ width: "20%",textAlign: "left",color: "#696969",borderTopWidth: "0px" }}>
                    <b>  Statut </b>
                </td>
            </tr>
          </thead>
          <tbody>
            {this.props.rows.map(mesure => (
              <TableRowMesure
                key={mesure.telephone}
                mesure={mesure}
              />
            ))}
          </tbody>
        </table>
      </div>
  );
};
    };

export default TableMesure;
