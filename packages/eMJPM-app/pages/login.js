import styled from "styled-components";

import LoginForm from "../src/components/loginComponents/LoginForm";
import { Layout } from "../src/components";

const Title = styled.div`
  text-align: left;
  font-size: 2em;
  padding-bottom: 15px;
  font-weight: bold;
`;

const { detect } = require("detect-browser");
const browser = detect();

// handle the case where we don't detect the browser
switch (browser && browser.name) {
  case "ie":
    alert(
      "Votre navigateur n'est pas compatible avec l'application e-mjpm. Nous vous recommandons d'utiliser Firefox ou Chromium ou Chrome."
    );
    break;
  default:
    console.log("not supported");
}

const LoginContainer = ({ style }) => (
  <div className="container" style={style}>
    <div className="col-12 offset-sm-2 col-sm-8 offset-md-3 col-md-6">
      <Title>Espace professionnels</Title>
      <LoginForm />
    </div>
  </div>
);

const LoginPage = () => (
  <Layout inscription>
    <LoginContainer style={{ marginTop: 100 }} />{" "}
  </Layout>
);

export default LoginPage;
