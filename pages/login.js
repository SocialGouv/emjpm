import styled from "styled-components";

import Footer from "../src/components/communComponents/Footer";
import Navigation from "../src/components/communComponents/Navigation";
import LoginForm from "../src/components/loginComponents/LoginForm";

const Title = styled.div`
  text-align: left;
  font-size: 2em;
  padding-bottom: 15px;
  font-weight: bold;
`;

const LoginContainer = ({ style }) => (
  <div className="container" style={style}>
    <div className="col-12 offset-sm-2 col-sm-8 offset-md-3 col-md-6">
      <Title>Espace professionnels</Title>
      <LoginForm />
    </div>
  </div>
);

const LoginPage = () => (
  <div style={{ backgroundColor: "#cad4de", minHeight: "100%" }}>
    <Navigation />
    <LoginContainer style={{ marginTop: 100 }} />
    <Footer fixed />
  </div>
);

export default LoginPage;
