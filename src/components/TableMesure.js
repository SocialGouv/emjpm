import TableRowMesure from "./TableRowMesure";
import MandatairesIndex from "../../pages/mandataires_index";
import MesureInput from "./MesureInput";
import styled from "styled-components";
import CreationMesure from "./CreationMesure";

const Container = ({ children }) => <div className="container">{children}</div>;

const TdStyle = styled.td`
  width: 20%;
  text-align: left;
  color: #696969;
  border-top: 0px solid white !important;
  display: "none";
`;

const DisplayCreationMesure = styled.div`
  display: ${props => props.display};
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 25px;
`;

const LineContainer = styled.div`
  padding-left: 0px;
  paddin-right: 0px;
`;
const Tr = styled.tr`
  border-top: 0px solid white;
`;

const Td = ({ children }) => <TdStyle>{children}</TdStyle>;

const ColStyle = styled.b`
  color: ${props => props.color || "black"};
`;

export const TableMesureView = ({ updateMesure, rows, display, display_ext}) => (
  <LineContainer>
    <DisplayCreationMesure display={display}>
      <CreationMesure className="row" updateMesure={updateMesure} />
    </DisplayCreationMesure>
    <table className="table responsive table-hover" style={{ boderTop: "0px" }}>
      <thead>
        <Tr>
          <Td>
            <ColStyle> Date d'ordonnance </ColStyle>
          </Td>
          <Td>
            <ColStyle> Résidence du majeur </ColStyle>
          </Td>
          <Td>
            <ColStyle> Type de mesure </ColStyle>
          </Td>
          <Td>
            <ColStyle> Genre </ColStyle>
          </Td>
          <Td>
            <ColStyle> Naissance </ColStyle>
          </Td>
          <td
            style={{
              width: "20%",
              textAlign: "left",
              color: "#696969",
              borderTopWidth: "0px",
              display: display
            }}
          />
            <td
                style={{
                    width: "20%",
                    textAlign: "left",
                    color: "#696969",
                    borderTopWidth: "0px",
                    display: display
                }}
            />
          <td
            style={{
              width: "20%",
              textAlign: "left",
              color: "#696969",
              borderTopWidth: "0px",
              display: display_ext
            }}
          >
            Date d'extinction
          </td>
        </Tr>
      </thead>
      <tbody>
        {rows &&
          rows.map(mesure => (
            <TableRowMesure
              display={display}
              display_ext={display_ext}
              key={mesure.id}
              mesure={mesure}
              updateMesure={updateMesure}
            />
          ))}
      </tbody>
    </table>
  </LineContainer>
);

class TableMesure extends React.Component {
  state = {
    showResults: false,
    modalIsOpen: false
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

  // closeModalAnnulerMesure = ({ formData }) => {
  //     this.onClickMesure(this.state.mesureId, formData);
  //     this.closeModal();
  // };
  //
  // closeModal = () => {
  //     this.setState({ modalIsOpen: false, modalIsOpenMesure: false });
  // };
  // updateedit = () => {
  //     this.setState({ updateedit: "inline-block" });
  // };
  // outEdit = () => {
  //     this.setState({ updateedit: "none" });
  // };

  render() {
    return (
      <TableMesureView
        display={this.props.display}
        display_ext={this.props.display_ext}
        updateMesure={this.props.updateMesure}
        rows={this.props.rows}
      />
    );
  }
}

export default TableMesure;
