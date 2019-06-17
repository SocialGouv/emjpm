import * as React from "react";
import Router from "next/router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { show } from "redux-modal";

import { doForgotPassword } from "../loginComponents/ForgotPasswordForm";
import { Button, Autocomplete, SelectionManager } from "..";
import apiFetch from "../communComponents/Api";

import { updateMandataire } from "./actions/mandataire";
import Fiche from "./Fiche";

import exportCV from "../common/exportCv";

// pick and display selected etablissement / tis
const Selector = ({
  title,
  style,
  emptyText = "Aucune selection",
  autocompleteItems = [],
  selected = [],
  onAdd,
  placeholder = "Ajouter"
}) => (
  <div style={{ margin: "20px 0", ...style }} data-cy={`selector-${title}`}>
    <h3>{title}</h3>
    <table style={{ width: 400 }}>
      <thead>
        <tr>
          <th colSpan={2}>
            <Autocomplete
              inputProps={{ placeholder, style: { width: 400, padding: 5 } }}
              items={autocompleteItems}
              onSelect={onAdd}
            />
          </th>
        </tr>
      </thead>
      <tbody style={{ paddinTop: 10 }}>
        {!selected.length && (
          <tr>
            <td colSpan={2} style={{ color: "silver" }}>
              {emptyText}
            </td>
          </tr>
        )}
        {selected.map(({ id, nom }, i) => (
          <tr key={id} style={{ background: i % 2 ? "#fff" : "rgba(0, 0, 0, 0.03)" }}>
            <td style={{ padding: 5 }}>▪ {nom}</td>
            <td style={{ width: 20, textAlign: "center" }} />
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// bouton connecté à redux-modal.show pour EditMandataire
const ButtonEditMandataire = connect(
  state => ({
    currentMandataire: state.mandataire.profiles
  }),
  dispatch => bindActionCreators({ show }, dispatch)
)(({ formData, show, currentMandataire }) => (
  <>
    <Button
      data-cy="button-edit-profile"
      style={{ marginLeft: 0 }}
      onClick={() =>
        show(formData.type === "service" ? "EditService" : "EditMandataire", {
          formData,
          currentMandataire
        })
      }
    >
      Modifier mon profil
    </Button>
  </>
));

const changePassword = email => {
  doForgotPassword(email)
    .then(() => {
      alert("Un email vient de vous être envoyé");
      Router.push("/mandataires");
    })
    .catch(error => {
      /* eslint-disable no-console */
      console.log(error);
      /* eslint-enable no-console */
    });
};

const getNewMandataire = props =>
  props.currentMandataire && props.currentMandataire.length !== 1
    ? props.currentMandataire.filter(manda => manda.id === props.mandataireId)[0]
    : props.currentMandataire && props.currentMandataire[0];

class MandataireProfile extends React.Component {
  onClick = mandataire => {
    exportCV(mandataire);
  };
  render() {
    const { etablissements, tis } = this.props;

    const newMandataire = getNewMandataire(this.props) || {};

    return (
      <div style={{ padding: 20, display: "flex", flexDirection: "row" }}>
        <div style={{ flex: "0 0 50%" }}>
          <h3>Mes coordonnées</h3>
          <Fiche {...newMandataire} />
          <div>
            Cv:{" "}
            <a href="#" onClick={() => this.onClick(newMandataire)}>
              {" "}
              {newMandataire.cv || "Non renseigné"}{" "}
            </a>
          </div>
          <br />
          <br />
          <ButtonEditMandataire formData={newMandataire} />
          <a href="#" onClick={() => changePassword({ email: newMandataire.email })}>
            {" "}
            Modifier mon mot de passe{" "}
          </a>
        </div>
        <div style={{ flex: "0 0 50%" }}>
          {(newMandataire.type === "prepose" && (
            <SelectionManager
              mandataireId={newMandataire.id}
              onAdd={etablissement_id =>
                apiFetch(`/mandataires/${newMandataire.id}/etablissements`, {
                  method: "POST",
                  body: JSON.stringify({
                    etablissement_id
                  })
                })
              }
              getSelection={() => apiFetch(`/mandataires/${newMandataire.id}/etablissement`)}
              render={({ onAdd, selection }) => (
                <Selector
                  style={{ marginTop: 0 }}
                  title="Mes établissements"
                  placeholder="Ajouter un établissement"
                  emptyText="Aucun établissement séléctionné"
                  autocompleteItems={
                    (etablissements &&
                      etablissements.map(f => ({
                        id: f.id,
                        nom: f.nom || f.ville || f.finess_id
                      }))) ||
                    []
                  }
                  selected={selection}
                  onAdd={onAdd}
                />
              )}
            />
          )) ||
            null}
          <SelectionManager
            mandataireId={newMandataire.id}
            onAdd={ti_id =>
              apiFetch(`/mandataires/${newMandataire.id}/tis`, {
                method: "POST",
                body: JSON.stringify({
                  ti_id
                })
              })
            }
            onRemove={id =>
              apiFetch(`/mandataires/${newMandataire.id}/tis/${id}`, {
                method: "DELETE"
              })
            }
            getSelection={() =>
              apiFetch(`/mandataires/${newMandataire.id}/tis`).then(
                data =>
                  (data &&
                    data.map(ti => ({
                      id: ti.id,
                      nom: ti.etablissement
                    }))) ||
                  []
              )
            }
            render={({ onAdd, onRemove, selection }) => (
              <Selector
                title="Tribunaux d'instance où je suis agréé"
                emptyText="Aucun tribunal séléctionné"
                placeholder="Ajouter un tribunal d'instance"
                autocompleteItems={
                  (tis && tis.map && tis.map(t => ({ id: t.id, nom: t.etablissement }))) || []
                }
                selected={selection}
                onAdd={onAdd}
                onRemove={onRemove}
              />
            )}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateMandataire: data => updateMandataire(data) }, dispatch);

const ProfileRedux = connect(
  state => ({
    currentMandataire: state.mandataire.profiles,
    etablissements: state.mandataire.finess,
    tis: state.mandataire.tis
  }),
  mapDispatchToProps
)(MandataireProfile);

export default ProfileRedux;
