import fetch from "isomorphic-fetch";
import getConfig from "next/config";
import Router from "next/router";
import React from "react";
import { findDOMNode } from "react-dom";
import Form from "react-jsonschema-form";
import ReactPiwik from "react-piwik";
import styled from "styled-components";
import { authService } from "../../business";
import { trackUser } from "../../piwik";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

const doLogin = formData => {
  const url = `${API_URL}/api/v2/auth/login`;
  return fetch(url, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  }).then(res => {
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
    <div className="alert alert-danger" role="alert" style={{ marginTop: 20 }}>
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
      <a href="/forgot-password">J&apos;ai oublié mon mot de passe et / ou mon identifiant</a>
      <ErrorBox message={error} />
      <hr style={{ marginTop: 20 }} />
      <a href="mailto:support.emjpm@fabrique.social.gouv.fr?subject=eMJPM&body=Bonjour,">
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
    ReactPiwik.push(["trackEvent", "navigation", "login"]);

    // focus login on load
    // eslint-disable-next-line react/no-find-dom-node
    const node = findDOMNode(this);
    if (node) {
      const username = node.querySelector("#root_username");
      const password = node.querySelector("#root_password");

      // workaround autofill bugs with react-jsonschema-form
      // https://github.com/mozilla-services/react-jsonschema-form/issues/184
      // use the DOM to fill initial formData
      const autofillValues = {
        username: (username && username.value) || localStorage.getItem("login") || "",
        password: password && password.value
      };

      if (username && !autofillValues.username) {
        username.focus();
      } else if (password) {
        password.focus();
      }

      this.setState({
        formData: autofillValues
      });
    }
  }

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
            authService.login(formData.username, json.token);
            ReactPiwik.push(["trackEvent", "login", "success"]);
            trackUser();
            Router.push(json.url);
            this.setState({
              status: "success",
              error: null
            });
          })
          .catch(() => {
            ReactPiwik.push(["trackEvent", "login", "error"]);
            const url = `${API_URL}/auth/checkUser`;
            return fetch(url, {
              credentials: "include",
              method: "POST",
              body: JSON.stringify(formData),
              headers: {
                "Content-Type": "application/json"
              }
            })
              .then(res => res && res.json())
              .then(res => {
                this.setState({
                  status: "error",
                  error: res.message
                });
              });
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
