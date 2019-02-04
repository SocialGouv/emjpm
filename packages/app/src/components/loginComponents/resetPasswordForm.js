import React from "react";
import { findDOMNode } from "react-dom";
import Form from "react-jsonschema-form";
import styled from "styled-components";
import Router from "next/router";
const queryString = require("query-string");

const API_URL = process.env.API_URL;

const doForgotPassword = formData => {
  const url = `${API_URL}/auth/reset_password`;
  return fetch(url, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ...formData,
      token: queryString.parse(location.search).token
    })
  }).then(res => {
    if (res.status >= 400) {
      throw new Error(res.status);
    }
    return res;
  });
};

const schema = {
  type: "object",
  required: ["newPassword", "verifyPassword"],
  properties: {
    newPassword: { type: "string", title: "", default: "" },
    verifyPassword: { type: "string", title: "", default: "" }
  }
};

const uiSchema = {
  newPassword: {
    "ui:placeholder": "Nouveau mot de passe",
    "ui:widget": "password",
    "ui:options": {
      label: false
    }
  },
  verifyPassword: {
    "ui:placeholder": "Vérification mot de passe",
    "ui:widget": "password",
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

export const ResetPasswordView = ({ formData, onSubmit, error, status }) => (
  <Jumbo>
    <Title>Mot de passe oublié</Title>
    <StyledForm schema={schema} uiSchema={uiSchema} formData={formData} onSubmit={onSubmit}>
      <button
        disabled={status === "loading" || status === "success"}
        style={{ display: "block" }}
        type="submit"
        className="btn btn-success"
      >
        {(status === "loading" && "Recherche...") ||
          (status === "success" && "Succès...") ||
          "Réinitialiser mon mot de passe"}
      </button>
      <br />
      <ErrorBox message={error} />
      <hr style={{ marginTop: 20 }} />
      <a href="mailto:contact@emjpm.beta.gouv.fr?subject=eMJPM&body=Bonjour,">
        Contactez-nous en cas de difficulté de connexion
      </a>
    </StyledForm>
  </Jumbo>
);

class ResetPassword extends React.Component {
  state = {
    error: null,
    status: null,
    formData: {}
  };
  componentDidMount() {
    const node = findDOMNode(this);
    if (node) {
      const input = node.querySelector("input");
      if (input) {
        input.focus();
      }
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
        doForgotPassword(formData)
          .catch(e => {
            this.setState({
              status: "error",
              error: "Vos mots de passe ne sont pas identiques"
            });
            throw e;
          })
          .then(() => {
            alert("Un email de confirmation vient de vous être envoyé");
            Router.push("/login");
            this.setState({
              status: "success",
              error: null
            });
          });
      }
    );
  };

  render() {
    return (
      <ResetPasswordView
        formData={this.state.formData}
        onSubmit={this.onSubmit}
        error={this.state.error}
        status={this.state.status}
      />
    );
  }
}

export default ResetPassword;
