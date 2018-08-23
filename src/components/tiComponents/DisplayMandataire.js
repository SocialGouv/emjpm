import * as React from "react";
import styled from "styled-components";
import TableTi from "./TableTi";

const MandatairesWidth = styled.div`
width: 45%
  background-color: white;
`;

const Title = styled.div`
  text-align: left;
  font-size: 2em;
  padding: 15px;
`;

const DisplayMandataire = ({ mesureCount, filteredData }) => (
  <MandatairesWidth>
    {(mesureCount > 0 && (
      <React.Fragment>
        <Title>
          {mesureCount} Professionnel{(mesureCount > 1 && "s") || null}
        </Title>
        <div style={{ maxHeight: "60vh", overflow: "auto" }}>
          <TableTi rows={filteredData} />
        </div>
      </React.Fragment>
    )) || (
      <React.Fragment>
        <Title>
          {mesureCount} Professionnel{(mesureCount > 1 && "s") || null}
        </Title>
        <div style={{ maxHeight: "60vh", overflow: "auto" }}>
          <TableTi rows={filteredData} />
        </div>
      </React.Fragment>
    )}
  </MandatairesWidth>
);

export default DisplayMandataire;
