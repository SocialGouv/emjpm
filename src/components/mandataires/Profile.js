import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { MinusSquare } from "react-feather";
import { show } from "redux-modal";

import { Button, AutocompleteState, SelectionManager } from "..";
import apiFetch from "../communComponents/Api";
import piwik from "../../piwik";

import { updateMandataire } from "./actions/mandataire";
import Fiche from "./Fiche";

// pick and display selected etablissement / tis
const Selector = ({
  title,
  style,
  emptyText = "Aucune selection",
  autocompleteItems = [],
  selected = [],
  onAdd,
  onRemove,
  placeholder = "Ajouter"
}) => (
  <div style={{ margin: "20px 0", ...style }} data-cy={`selector-${title}`}>
    <h3>{title}</h3>
    <table style={{ width: 400 }}>
      <thead>
        <tr>
          <th colSpan={2}>
            <AutocompleteState
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
            <td style={{ width: 20, textAlign: "center" }}>
              <MinusSquare
                title="Supprimer"
                style={{ cursor: "pointer", width: 22, height: 22 }}
                onClick={() => onRemove({ id, nom })}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// bouton connecté à redux-modal.show pour EditMandataire
const ButtonEditMandataire = connect(
  null,
  dispatch => bindActionCreators({ show }, dispatch)
)(({ formData, show }) => (
  <Button
    data-cy="button-edit-profile"
    style={{ marginLeft: 0 }}
    onClick={() => show("EditMandataire", { formData })}
  >
    Modifier mon profil
  </Button>
));

const MandataireProfile = ({ currentMandataire, etablissements = [], tis = [] }) => (
  <div style={{ padding: 20, display: "flex", flexDirection: "row" }}>
    <div style={{ flex: "0 0 50%" }}>
      <Fiche {...currentMandataire} />
      <br />
      <br />
      <ButtonEditMandataire formData={currentMandataire} />
    </div>
    <div style={{ flex: "0 0 50%" }}>
      {(currentMandataire.type === "Prepose" && (
        <SelectionManager
          onAdd={etablissement_id =>
            apiFetch(`/mandataires/1/etablissements`, {
              method: "POST",
              body: JSON.stringify({
                etablissement_id
              })
            })
          }
          onRemove={id =>
            apiFetch(`/mandataires/1/etablissements/${id}`, {
              method: "DELETE"
            })
          }
          getSelection={() => apiFetch("/mandataires/1/etablissement")}
          render={({ onAdd, onRemove, selection }) => (
            <Selector
              style={{ marginTop: 0 }}
              title="Mes établissements"
              placeholder="Ajouter un établissement"
              emptyText="Aucun établissement séléctionné"
              autocompleteItems={etablissements.map(f => ({
                id: f.id,
                nom: f.nom || f.ville || f.finess_id
              }))}
              selected={selection}
              onAdd={onAdd}
              onRemove={onRemove}
            />
          )}
        />
      )) ||
        null}
      <SelectionManager
        onAdd={ti_id =>
          apiFetch(`/mandataires/1/tis`, {
            method: "POST",
            body: JSON.stringify({
              ti_id
            })
          })
        }
        onRemove={id =>
          apiFetch(`/mandataires/1/tis/${id}`, {
            method: "DELETE"
          })
        }
        getSelection={() =>
          apiFetch("/mandataires/1/tis").then(data =>
            data.map(ti => ({
              id: ti.id,
              nom: ti.etablissement
            }))
          )
        }
        render={({ onAdd, onRemove, selection }) => (
          <Selector
            title="Tribunaux d'instance où je suis agréé"
            emptyText="Aucun tribunal séléctionné"
            placeholder="Ajouter un tribunal d'instance"
            autocompleteItems={tis.map(t => ({ id: t.id, nom: t.etablissement }))}
            selected={selection}
            onAdd={onAdd}
            onRemove={onRemove}
          />
        )}
      />
    </div>
  </div>
);

const mapDispatchToProps = (dispatch, ownProps) =>
  bindActionCreators({ updateMandataire: data => updateMandataire(data) }, dispatch);

const ProfileRedux = connect(
  state => ({
    currentMandataire: state.mandataire.profile,
    etablissements: state.mandataire.finess,
    tis: state.mandataire.tis
  }),
  mapDispatchToProps
)(MandataireProfile);

export default ProfileRedux;
