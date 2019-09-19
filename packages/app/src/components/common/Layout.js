import React from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.css";
import "react-tabs/style/react-tabs.css";
import "../../../static/css/custom.css";
import "../../../static/css/footer.css";
import "../../../static/css/hero.css";
import "../../../static/css/panel.css";

import Navigation from "../communComponents/Navigation";
import Footer from "../communComponents/Footer";

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
