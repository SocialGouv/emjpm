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
  border-top-width: 0px;
`;

const Td = ({ children }) => <TdStyle>{children}</TdStyle>;

const ColStyle = styled.b`
  color: ${props => props.color || "black"};
`;

export const TableMesureView = ({ updateMesure, rows }) => (
  <Container>
    <CreationMesure className="row" updateMesure={updateMesure} />
    <table className="table responsive table-hover" style={{ boderTop: "0px" }}>
      <thead>
        <tr>
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
          <Td />
        </tr>
      </thead>
      <tbody>
        {rows &&
          rows.map(mesure => (
            <TableRowMesure key={mesure.id} mesure={mesure} updateMesure={updateMesure} />
          ))}
      </tbody>
    </table>
  </Container>
);

class TableMesure extends React.Component {
  state = {
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
    return <TableMesureView updateMesure={this.props.updateMesure} rows={this.props.rows} />;
  }
}

export default TableMesure;
