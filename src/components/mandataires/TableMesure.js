import TableRowMesure from "./TableRowMesure";
import styled from "styled-components";

import CreationMesure from "./CreationMesure";

const TdStyle = styled.td`
  width: 15%;
  text-align: left;
  color: black;
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
  vertical-align: "middle";
`;
const Tr = styled.tr`border-top: 0px solid white;`;

const Td = ({ children }) => <TdStyle>{children}</TdStyle>;

const ColStyle = styled.b`color: black;`;

export const TableMesureView = ({ rows, display, display_ext, updateMesure }) => (
  <LineContainer>
    <DisplayCreationMesure display={display}>
      <CreationMesure updateMesure={updateMesure} />
    </DisplayCreationMesure>
    {rows && rows.length ? (
      <table className="table">
        <thead>
          <Tr>
            <Td>
              <ColStyle> Date de décision </ColStyle>
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
            <TdStyle display={display_ext}>
              {" "}
              <ColStyle>Date d'extinction </ColStyle>
            </TdStyle>
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
                updateMesure={updateMesure}
              />
            ))}
        </tbody>
      </table>
    ) : (
      <div style={{ textAlign: "center", paddingTop: "35vh", display: display_ext }}>
        {" "}
        vous n'avez pas de mesures éteintes{" "}
      </div>
    )}
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
        updateMesure={this.props.updateMesure}
      />
    );
  }
}

export default TableMesure;
