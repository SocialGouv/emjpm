import React from "react";
import { Mail, User } from "react-feather";

const iconStyle = { width: 22, height: 22, marginRight: 10 };

// fiche recap
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { show } from "redux-modal";
import Router from "next/router";

import { Button } from "..";

import { updateUser } from "../tiComponents/actions/user";
import { doForgotPassword } from "../loginComponents/ForgotPasswordForm";

const ChangePassword = email => {
  doForgotPassword(email)
    .then(() => {
      alert("Un email vient de vous être envoyé");
      Router.push("/tis");
    })
    .catch(error => {
      /* eslint-disable no-console */
      console.error(error);
      /* eslint-enable no-console */
    });
};

// bouton connecté à redux-modal.show pour EditMandataire
const ButtonEditUser = connect(
  state => ({
    currentUser: state.user.profile
  }),
  dispatch => bindActionCreators({ show }, dispatch)
)(({ formData, show }) => (
  <>
    <Button
      data-cy="button-edit-profile"
      style={{ marginLeft: 0 }}
      onClick={() =>
        show("EditUser", {
          formData
        })
      }
    >
      Modifier mon profil
    </Button>
  </>
));

const UserProfile = ({ currentUser }) => (
  <div style={{ padding: 20, display: "flex", flexDirection: "row" }}>
    <div style={{ flex: "0 0 50%" }}>
      <h3>Mes coordonnées</h3>
      <User style={iconStyle} />
      {(currentUser.nom && (
        <div style={{ lineHeight: "3em" }} data-cy="fiche-ti-prenom">
          nom: {currentUser.nom}
        </div>
      )) ||
        null}
      {(currentUser.prenom && (
        <div style={{ lineHeight: "3em" }} data-cy="fiche-ti-prenom">
          prénom: {currentUser.prenom}
        </div>
      )) ||
        null}
      {(currentUser.email && (
        <div style={{ lineHeight: "3em" }} data-cy="fiche-manda-email">
          <Mail style={iconStyle} />
          <a href={`mailto:${currentUser.email}`}>{currentUser.email}</a>
        </div>
      )) ||
        null}
      {(currentUser.cabinet && (
        <div style={{ lineHeight: "3em" }} data-cy="fiche-ti-prenom">
          cabinet: {currentUser.cabinet}
        </div>
      )) ||
        null}
      <br />
      <br />
      <ButtonEditUser formData={currentUser} />
      <a href="#" onClick={() => ChangePassword({ email: currentUser.email })}>
        {" "}
        Modifier mon mot de passe{" "}
      </a>
    </div>
  </div>
);

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateUser: data => updateUser(data) }, dispatch);

const ProfileUserRedux = connect(
  state => ({
    currentUser: state.user.profile
  }),
  mapDispatchToProps
)(UserProfile);

export default ProfileUserRedux;
