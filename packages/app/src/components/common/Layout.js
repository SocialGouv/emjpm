import React from "react";
import styled from "styled-components";

import { Navigation, Footer } from "..";

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100%;
  flex-direction: column;
  background-color: #cad4de;
`;

const Layout = ({ children, inscription, logout }) => (
  <LayoutContainer>
    <Navigation logout={logout} inscription={inscription} />
    <div className="container" style={{ flex: "1 0 auto" }}>
      {children}
    </div>
    <Footer />
  </LayoutContainer>
);

export default Layout;
