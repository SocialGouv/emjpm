import React from "react";
import styled from "styled-components";

const TdCell = styled.td`
  font-size: 0.9em;
  text-align: left;
  vertical-align: middle !important;
`;

const Cell = ({ children }) => <TdCell className="pagination-centered">{children}</TdCell>;

export default Cell;
