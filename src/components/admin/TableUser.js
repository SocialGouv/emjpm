import TableRowMesure from "./TableRowMesure";
import styled from "styled-components";

const Tr = styled.tr`
  border-top: 0px solid white;
`;

const Td = ({ children }) => <TdStyle>{children}</TdStyle>;

const ColStyle = styled.b`
  color: ${props => props.color || "black"};
`;

const TableUser = ({}) => (
  <table className="table " style={{ boderTop: "0px" }}>
    <thead>
      <Tr>
        <Td>
          <ColStyle> Nom </ColStyle>
        </Td>
        <Td>
          <ColStyle> Prénom </ColStyle>
        </Td>
        <Td>
          <ColStyle> Email </ColStyle>
        </Td>
        <Td>
          <ColStyle> Téléphone </ColStyle>
        </Td>
        <Td>
          <ColStyle> ville - Code postal </ColStyle>
        </Td>
        <Td>
          <ColStyle> Type </ColStyle>
        </Td>
      </Tr>
    </thead>
    <tbody>{row && row.map(user => <RowUser />)}</tbody>
  </table>
);
