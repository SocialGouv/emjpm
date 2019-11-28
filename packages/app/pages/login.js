// import "bootstrap/dist/css/bootstrap.css";

import Head from "next/head";
import React from "react";
import styled from "styled-components";

import { Layout } from "../src/components";
import { PageTracker } from "../src/components/common/PageTracker";
import LoginForm from "../src/components/loginComponents/LoginForm";
import { withAuthSync } from "../src/util/auth";

const Title = styled.div`
  text-align: left;
  font-size: 2em;
  padding-bottom: 15px;
  font-weight: bold;
`;
/*TODO (adrien) : check for ie < 11
const { detect } = require("detect-browser");
const browser = detect();

//handle the case where we don't detect the browser

switch (browser && browser.name) {
  case "ie":
    alert(
      "Votre navigateur n'est pas compatible avec l'application e-mjpm. Nous vous recommandons d'utiliser Firefox ou Chromium ou Chrome."
    );
    break;
  default:
    console.log("not supported");
}
*/

const LoginContainer = ({ style }) => (
  <div className="container" style={style}>
    <div className="col-12 col-sm-12 offset-md-3 col-md-6">
      <Title>Espace professionnels</Title>
      <LoginForm />
    </div>
  </div>
);

class LoginPage extends React.Component {
  render() {
    return (
      <Layout inscription>
        <Head>
          <title>Login</title>
        </Head>
        <PageTracker url="/login" />
        <LoginContainer style={{ marginTop: 100 }} />{" "}
      </Layout>
    );
  }
}

export default withAuthSync(LoginPage);
