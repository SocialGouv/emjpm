import * as React from "react";
import styled from "styled-components";
import Form from "react-jsonschema-form";

//Redux
import { connect } from "react-redux";
import { connectModal } from "redux-modal";

import Commentaire from "../Commentaire";
import Layout from "./Layout";
import apiFetch from "../../communComponents/Api";
import FicheMandataireManda from "../../mandataires/Fiche";

const TitleMandataire = styled.div`
  text-align: left;
  font-size: 1.5em;
  font-weight: bold;
`;

// Commentaire View display
const uiSchema = {
  comment: {
    "ui:widget": "textarea"
  }
};

const schema = {
  type: "object",
  required: ["comment"],
  properties: {
    comment: { type: "string", title: "message", default: "" }
  }
};
const formData = {};

const CommentairesView = ({ onSubmit, commentaires, onDelete }) => (
  <div className="form-group" style={{ marginTop: "8px" }}>
    <label htmlFor="exampleFormControlTextarea1" style={{ marginLeft: "0px" }}>
      <b>
        Ajoutez vos notes (ces dernières seront uniquement accessibles aux utilisateurs de votre TI){" "}
      </b>
    </label>
    <br />
    <Form
      className="form__commentaire"
      schema={schema}
      formData={formData}
      uiSchema={uiSchema}
      onSubmit={onSubmit}
    >
      <div style={{ textAlign: "left", paddingBottom: "10px" }}>
        <label htmlFor="exampleFormControlTextarea1">Attention à la sensibilité des données.</label>
        <br />
        <button
          type="submit"
          style={{
            color: "white",
            backgroundColor: "#43b04a",
            boxShadow: "3px 3px grey"
          }}
          className="btn"
        >
          Enregistrer
        </button>
      </div>
    </Form>

    <hr />
    <div style={{ overflow: "scroll", height: "250px" }} data-cy="tab-comment">
      {commentaires &&
        commentaires.map &&
        commentaires.map(comment => (
          <div id={comment.id}>
            <div style={{ backgroundColor: "#b5b5b5", fontSize: "0.8em" }}>
              {comment.comment} <br />
            </div>
            Ajouté le : {comment.created_at.slice(0, 10)}{" "}
            <a type="submit" onClick={() => onDelete(comment)}>
              {" "}
              supprimer
            </a>
            <br />
          </div>
        ))}
    </div>
  </div>
);

class FicheMandataireModal extends React.Component {
  render() {
    const {
      currentMandataire,
      allTisForOneMandataire,
      currentEtablissementsForSelectedMandataire,
      show,
      handleHide
    } = this.props;
    return (
      <Layout show={show} handleHide={handleHide}>
        <FicheMandataire
          mandataire={currentMandataire}
          currentEtablissementsForSelectedMandataire={currentEtablissementsForSelectedMandataire}
          allTisForOneMandataire={allTisForOneMandataire}
        />
      </Layout>
    );
  }
}
export const FicheMandataire = ({
  mandataire,
  currentEtablissementsForSelectedMandataire,
  allTisForOneMandataire
}) => (
  <div className="container">
    <div className="row" style={{ marginLeft: "5px" }}>
      <TitleMandataire>
        {mandataire.etablissement} <br /> {mandataire.type.toUpperCase()} <br /> {mandataire.genre}
      </TitleMandataire>
      <br />
      <FicheMandataireManda
        email={mandataire.email}
        telephone={mandataire.telephone}
        telephone_portable={mandataire.telephone_portable}
        adresse={mandataire.adresse}
        code_postal={mandataire.code_postal}
        ville={mandataire.ville}
        dispo_max={mandataire.dispo_max}
        secretariat={mandataire.secretariat}
        nb_secretariat={mandataire.nb_secretariat}
        displayTitle={"none"}
      />
      <br />
      <div>
        {currentEtablissementsForSelectedMandataire && (
          <React.Fragment>
            {currentEtablissementsForSelectedMandataire.map(etablissement => (
              <div>
                {" "}
                <b>Etablissement </b> <br />
                {etablissement.nom}
              </div>
            ))}
            <br />
          </React.Fragment>
        )}
      </div>
      <br />
      <div>
        {allTisForOneMandataire && (
          <React.Fragment>
            <b>Tis </b> <br />
            {allTisForOneMandataire.map(ti => (
              <div>
                {ti.etablissement} <br />
              </div>
            ))}
          </React.Fragment>
        )}
      </div>
      <br />
      <br />
      <Commentaire
        getCommentaires={() => apiFetch(`/mandataires/${mandataire.id}/commentaires)`)}
        onDelete={id =>
          apiFetch(`/mandataires/${mandataire.id}/commentaires/${id})`, {
            method: "DELETE"
          })
        }
        onSubmit={formData =>
          apiFetch(`/mandataires/${mandataire.id}/commentaires`, {
            method: "POST",
            body: JSON.stringify({
              comment: formData.comment
            })
          })
        }
        render={({ onSubmit, onDelete, data }) => (
          <CommentairesView onSubmit={onSubmit} commentaires={data} onDelete={onDelete} />
        )}
      />
    </div>
  </div>
);

const mapStateToProps = state => ({
  allTisForOneMandataire: state.mandataire.allTisForOneMandataire,
  currentEtablissementsForSelectedMandataire:
    state.mandataire.currentEtablissementsForSelectedMandataire
});

export default connect(
  mapStateToProps,
  null
)(connectModal({ name: "FicheMandataireModal", destroyOnHide: true })(FicheMandataireModal));
