import TableRowMesure from "./TableRowMesure";
import MandatairesIndex from "../../../pages/mandataires_index";
import MesureInput from "../MesureInput";
import styled from "styled-components";
import CreationMesure from "./CreationMesure";

const Container = ({ children }) => <div className="container">{children}</div>;

const TdStyle = styled.td`
  width: 20%;
  text-align: left;
  color: #696969;
  border-top: 0px solid white !important;
  display: "none";
  display: ${props => props.display};
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

export const TableMesureView = ({
  rows,
  display,
  display_ext,
  updateMesureEteinte
}) => (
  <LineContainer>
    <DisplayCreationMesure display={display}>
      <CreationMesure className="row" updateMesure={updateMesureEteinte} />
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
          <TdStyle display={display} />
          <TdStyle display={display} />
          <TdStyle display={display_ext}>Date d'extinction</TdStyle>
          <TdStyle display={display_ext} />
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
              updateMesureEteinte={updateMesureEteinte}
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

  render() {
    return (
      <TableMesureView
        display={this.props.display}
        display_ext={this.props.display_ext}
        rows={this.props.rows}
        updateMesureEteinte={this.props.updateMesureEteinte}
      />
    );
  }
}

export default TableMesure;
