import * as React from "react";
import styled from "styled-components";
import TableTi from "./TableTi";

const MandatairesContainer = styled.div`
  background-color: white;
`;

const Title = styled.div`
  text-align: left;
  font-size: 2em;
  padding: 15px;
`;

const DisplayMandataires = ({ mesureCount, filteredData }) => (
  <MandatairesContainer>
    {(mesureCount > 0 && (
      <React.Fragment>
        <Title>
          {mesureCount} Professionnel
          {(mesureCount > 1 && "s") || null}
        </Title>
        <div style={{ maxHeight: "60vh", overflow: "auto" }}>
          <TableTi rows={filteredData} />
        </div>
      </React.Fragment>
    )) || (
      <div style={{ textAlign: "center", marginTop: 20 }}>Aucun mandataire dans cette zone</div>
    )}
  </MandatairesContainer>
);

export default DisplayMandataires;
