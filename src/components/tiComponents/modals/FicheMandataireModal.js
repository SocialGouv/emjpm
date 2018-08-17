import { connect } from "react-redux";
import * as React from "react";
import styled from "styled-components";
import Form from "react-jsonschema-form";

import Commentaire from "../Commentaire";
import RowModal from "../../communComponents/RowModal";
import { connectModal } from "redux-modal";
import Layout from "./Layout";
import apiFetch from "../../communComponents/Api";

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
  <div className="form-group">
    <label htmlFor="exampleFormControlTextarea1">
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
    <div className="row">
      <div className="col-6">
        <TitleMandataire>{mandataire.etablissement}</TitleMandataire>
        <div>{mandataire.type.toUpperCase()}</div>
        <div>{mandataire.genre}</div>
        <RowModal value={mandataire.adresse} />
        <div>
          {mandataire.code_postal} {mandataire.ville.toUpperCase()}
        </div>
        <br />
        <div data-cy="tab-telephone">{mandataire.telephone}</div>
        <div>{mandataire.email}</div>
        <br />
        <div style={{ textAlign: "left" }}>
          <b>Secrétariat </b>
          <br />
          {mandataire.secretariat === true ? "Oui" : "Non"} - {mandataire.nb_secretariat}
          <br />
          {currentEtablissementsForSelectedMandataire && (
            <React.Fragment>
              <b>Etablissement </b> <br />
              {currentEtablissementsForSelectedMandataire.map(etablissement => (
                <div>{etablissement.nom}</div>
              ))}
              <br />
            </React.Fragment>
          )}
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
      </div>
      <div className="col-6">
        <div
          style={{
            verticalAlign: "middle",
            paddingLeft: 10,
            borderBottom: "20px",
            lineHeight: "40px"
          }}
        >
          Mesures en cours : {mandataire.mesures_en_cours} / {mandataire.dispo_max}
        </div>
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
