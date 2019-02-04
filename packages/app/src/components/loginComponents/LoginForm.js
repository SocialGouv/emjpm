import { findDOMNode } from "react-dom";
import fetch from "isomorphic-fetch";
import Form from "react-jsonschema-form";
import styled from "styled-components";
import Router from "next/router";
import piwik from "react-piwik";

import { trackUser } from "../../piwik";

const API_URL = process.env.API_URL;

const doLogin = formData => {
  const url = `${API_URL}/auth/login`;
  return fetch(url, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  }).then(res => {
    //  console.log(res);
    if (res.status > 400) {
      // unauthorized
      throw new Error(res.status);
    }
    return res.json();
  });
};

const schema = {
  type: "object",
  required: ["username", "password"],
  properties: {
    username: { type: "string", title: "", default: "" },
    password: { type: "string", title: "", default: "" }
    // done: {
    //   type: "boolean",
    //   title: " se souvenir de mes informations ",
    //   default: false
    // }
  }
};

const uiSchema = {
  password: {
    "ui:placeholder": "Mot de passe",
    "ui:widget": "password",
    "ui:options": {
      label: false
    }
  },
  username: {
    "ui:placeholder": "Identifiant",
    "ui:options": {
      label: false
    }
  }
};

const StyledForm = styled(Form)`
  .form-group,
  legend {
    padding-left: 0;
  }
  .field-string {
    display: block !important;
  }
`;

const JumboContent = styled.div`
  background-color: white;
  padding: 30px 20px 10px 20px;
`;

const Jumbo = ({ children }) => <JumboContent className="jumbotron">{children}</JumboContent>;

const ErrorBox = ({ message }) =>
  (message && (
    <div className="alert alert-danger" role="alert">
      {message}
    </div>
  )) ||
  null;

const Title = styled.div`
  font-size: 1.3em;
  font-weight: bold;
  margin-bottom: 1em;
`;

// handle the view only
export const LoginFormView = ({ formData, onSubmit, error, status }) => (
  <Jumbo>
    <Title>Se connecter</Title>
    <StyledForm schema={schema} uiSchema={uiSchema} formData={formData} onSubmit={onSubmit}>
      <button
        disabled={status === "loading" || status === "success"}
        style={{ display: "block" }}
        type="submit"
        className="btn btn-success"
      >
        {(status === "loading" && "Authentification...") ||
          (status === "success" && "Redirection...") ||
          "Me connecter"}
      </button>
      <br />
      <a href="/forgot-password">J&apos;ai oublié mon mot de passe</a>
      <ErrorBox message={error} />
      <hr style={{ marginTop: 20 }} />
      <a href="mailto:contact@emjpm.beta.gouv.fr?subject=eMJPM&body=Bonjour,">
        Contactez-nous en cas de difficulté de connexion
      </a>
    </StyledForm>
  </Jumbo>
);

// handle the state only
class LoginForm extends React.Component {
  state = {
    error: null,
    status: null,
    formData: {}
  };
  componentDidMount() {
    piwik.push(["trackEvent", "navigation", "login"]);

    // focus login on load
    const node = findDOMNode(this);
    if (node) {
      const input = node.querySelector("input");
      if (input) {
        input.focus();
      }
    }

    // workaround autofill bugs with react-jsonschema-form
    // https://github.com/mozilla-services/react-jsonschema-form/issues/184
    // use the DOM to fill initial formData
    const autofillValues = {
      username: node.querySelector("#root_username") && node.querySelector("#root_username").value,
      password: node.querySelector("#root_password") && node.querySelector("#root_password").value
    };

    this.setState({
      formData: autofillValues
    });
  }

  setToken = idToken => {
    // Saves user token to localStorage
    localStorage.setItem("id_token", idToken);
  };

  onSubmit = ({ formData }) => {
    this.setState(
      {
        error: null,
        status: "loading",
        formData
      },
      () => {
        doLogin(formData)
          .then(json => {
            this.setToken(json.token);
            piwik.push(["trackEvent", "login", "success"]);

            trackUser();

            Router.push(json.url);
            this.setState({
              status: "success",
              error: null
            });
          })
          .catch(e => {
            piwik.push(["trackEvent", "login", "error"]);
            this.setState({
              status: "error",
              error: "Impossible de se connecter"
            });
            //throw e;
          });
      }
    );
  };

  render() {
    return (
      <LoginFormView
        formData={this.state.formData}
        onSubmit={this.onSubmit}
        error={this.state.error}
        status={this.state.status}
      />
    );
  }
}

export default LoginForm;
