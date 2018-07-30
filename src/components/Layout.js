import styled from "styled-components";

import { Navigation, Footer } from ".";

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #cad4de;
`;

const Layout = ({ children }) => (
  <LayoutContainer>
    <Navigation logout />
    <div className="container">{children}</div>
    <Footer />
  </LayoutContainer>
);

export default Layout;
