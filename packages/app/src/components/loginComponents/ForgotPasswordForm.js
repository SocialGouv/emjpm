import { findDOMNode } from "react-dom";
import Form from "react-jsonschema-form";
import styled from "styled-components";
import Router from "next/router";

import piwik from "../../piwik";

const API_URL = process.env.API_URL;

const doForgotPassword = formData => {
  const url = `${API_URL}/auth/forgot_password`;
  return fetch(url, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  }).then(res => {
    if (res.status > 400) {
      throw new Error(res.status);
    }
    return res;
  });
};

const schema = {
  type: "object",
  required: ["email"],
  properties: {
    email: { type: "string", title: "", default: "" }
  }
};

const uiSchema = {
  email: {
    "ui:placeholder": "email",
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
  input {
    width: 300px;
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
export const ForgotPasswordView = ({ formData, onSubmit, error, status }) => (
  <Jumbo>
    <Title>Récupérer votre compte</Title>
    <StyledForm schema={schema} uiSchema={uiSchema} formData={formData} onSubmit={onSubmit}>
      <button
        disabled={status === "loading" || status === "success"}
        style={{ display: "block" }}
        type="submit"
        className="btn btn-success"
      >
        {(status === "loading" && "Recherche...") ||
          (status === "success" && "Succès...") ||
          "Demander mon mot de passe"}
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

class ForgotPassword extends React.Component {
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
        piwik.push(["trackEvent", "has forgot his/her password", formData.email]);

        doForgotPassword(formData)
          .then(() => {
            alert("Un email vient de vous être envoyé");
            Router.push("/login");
            this.setState({
              status: "success",
              error: null
            });
          })
          .catch(e => {
            this.setState({
              status: "error",
              error: "Impossible de trouver l'email"
            });
          });
      }
    );
  };

  render() {
    return (
      <ForgotPasswordView
        formData={this.state.formData}
        onSubmit={this.onSubmit}
        error={this.state.error}
        status={this.state.status}
      />
    );
  }
}

export default ForgotPassword;
