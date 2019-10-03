import React, { Fragment } from "react";
import { findDOMNode } from "react-dom";
import Form from "react-jsonschema-form";
import styled from "styled-components";
import Router from "next/router";
import getConfig from "next/config";
import ReactPiwik from "react-piwik";
import Modal from "react-modal";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

export const doForgotPassword = formData => {
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
      <a href="mailto:support.emjpm@fabrique.social.gouv.fr?subject=eMJPM&body=Bonjour,">
        Contactez-nous en cas de difficulté de connexion
      </a>
    </StyledForm>
  </Jumbo>
);

class ForgotPassword extends React.Component {
  state = {
    error: null,
    status: null,
    formData: {},
    showModal: false,
    modalContent: ""
  };
  componentDidMount() {
    // eslint-disable-next-line react/no-find-dom-node
    const node = findDOMNode(this);
    if (node) {
      const input = node.querySelector("input");
      if (input) {
        input.focus();
      }
    }
  }

  constructor() {
    super();
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal(content) {
    this.setState({ showModal: true, modalContent: content });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  onSubmit = ({ formData }) => {
    this.setState(
      {
        error: null,
        status: "loading",
        formData
      },
      () => {
        ReactPiwik.push(["trackEvent", "has forgot his/her password", formData.email]);

        doForgotPassword(formData)
          .then(() => {
            this.handleOpenModal("Un email vient de vous être envoyé");
            this.setState({
              status: "success",
              error: null
            });
          })
          .catch(() =>
            this.setState({
              status: "error",
              error: "Impossible de trouver l'email"
            })
          );
      }
    );
  };

  render() {
    const { modalContent, showModal } = this.state;
    return (
      <Fragment>
        <Modal
          className="modal-alert"
          overlayClassName="modal-overlay"
          isOpen={showModal}
          contentLabel="Minimal Modal Example"
        >
          <h2>Attention</h2>
          <p>{modalContent}</p>
          <button className="btn btn-success" onClick={() => Router.push("/login")}>
            Revenir à la page de connexion
          </button>
          <button className="close-modal" onClick={() => Router.push("/login")}>
            Close Modal
          </button>
        </Modal>
        <ForgotPasswordView
          formData={this.state.formData}
          onSubmit={this.onSubmit}
          error={this.state.error}
          status={this.state.status}
        />
      </Fragment>
    );
  }
}

export default ForgotPassword;
