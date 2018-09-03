import * as React from "react";
import styled from "styled-components";
import Form from "react-jsonschema-form";
import { PlusSquare, Trash } from "react-feather";
import { format } from "date-fns";

//Redux
import { connect } from "react-redux";
import { connectModal, show, hide } from "redux-modal";
import { bindActionCreators } from "redux";

import { Button } from "../..";
import FetchCommentaires from "../FetchCommentaires";
import Layout from "../../mandataires/modals/Layout";
import apiFetch from "../../communComponents/Api";
import FicheMandataire from "../../mandataires/Fiche";

const TitleMandataire = styled.div`
  text-align: left;
  font-size: 1.5em;
  font-weight: bold;
`;
const CellMesureReservationRedux = connect(
  null,
  dispatch => bindActionCreators({ show }, dispatch)
)(({ show, mandataire }) => (
  <div
    data-cy="button-attente-mesure"
    style={{ cursor: "pointer" }}
    title="Attribuer une mesure"
    onClick={() => {
      // TODO: move to actions
      hide("FicheMandataireModal");
      show("ModalMesureReservation", { reservationMandataire: mandataire });
    }}
  >
    <PlusSquare /> Attribuer une mesure
  </div>
));

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

const Comment = styled.div`
  border-bottom: 1px solid #c9d3df;
  box-shadow: 0 10px 10px -10px #b7bcdf;
  margin-bottom: 5px;
  display: block;
`;

const CommentairesView = ({ onSubmit, commentaires, onDelete }) => (
  <div className="form-group" style={{ marginTop: "8px" }}>
    <label htmlFor="exampleFormControlTextarea1" style={{ marginLeft: "0px" }}>
      <b>Ajoutez vos notes.</b>
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
        <label htmlFor="exampleFormControlTextarea1">
          Attention à la sensibilité des données.
          <br />
          (ces dernières seront uniquement accessibles aux utilisateurs de votre TI){" "}
        </label>
        <br />
        <Button data-cy="button-enregistrer-comment">Enregistrer</Button>
      </div>
    </Form>

    <hr />
    <div style={{ overflow: "scroll", height: "250px" }} data-cy="tab-comment">
      {commentaires &&
        commentaires.map &&
        commentaires.map(comment => (
          <Comment id={comment.id} key={comment.id}>
            <div style={{ backgroundColor: "#eee", fontSize: "0.8em" }}>
              Ajouté le :{" "}
              {format(comment.created_at, "D MMMM YYYY à HH:mm", {
                locale: require("date-fns/locale/fr")
              })}
              <Trash
                size={16}
                onClick={() => onDelete(comment)}
                style={{ float: "right", cursor: "pointer" }}
                title="supprimer le commentaire"
              />
            </div>
            <div style={{ backgroundColor: "#eee", fontSize: "1em" }}>
              {comment.comment} <br />
            </div>
            <br />
          </Comment>
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
      <Layout show={show} handleHide={handleHide} className="FicheMandataireModal">
        <div style={{ display: "flex", padding: "20px", boxSizing: "border-box" }}>
          <div style={{ flex: "1 0 50%" }}>
            <TitleMandataire>
              {currentMandataire.etablissement} <br /> {currentMandataire.type.toUpperCase()} <br />{" "}
              {currentMandataire.genre}
            </TitleMandataire>

            <FicheMandataire
              email={currentMandataire.email}
              telephone={currentMandataire.telephone}
              telephone_portable={currentMandataire.telephone_portable}
              adresse={currentMandataire.adresse}
              code_postal={currentMandataire.code_postal}
              ville={currentMandataire.ville}
              dispo_max={currentMandataire.dispo_max}
              secretariat={currentMandataire.secretariat}
              nb_secretariat={currentMandataire.nb_secretariat}
              displayTitle={"none"}
            />

            <div>
              {currentEtablissementsForSelectedMandataire && (
                <React.Fragment>
                  {currentEtablissementsForSelectedMandataire.map(etablissement => (
                    <div key={etablissement.nom}>
                      {" "}
                      <b>Etablissement </b> <br />
                      {etablissement.nom}
                    </div>
                  ))}
                  <br />
                </React.Fragment>
              )}
            </div>

            <div>
              {allTisForOneMandataire && (
                <React.Fragment>
                  <b>Tribunaux d'instance </b> <br />
                  {allTisForOneMandataire.map(ti => (
                    <div key={ti.etablissement}>
                      {ti.etablissement} <br />
                    </div>
                  ))}
                </React.Fragment>
              )}
              <br />
              <div>
                <CellMesureReservationRedux mandataire={currentMandataire} />
              </div>
            </div>
          </div>
          <div style={{ flex: "1 0 50%" }}>
            <FetchCommentaires
              getCommentaires={() => apiFetch(`/mandataires/${currentMandataire.id}/commentaires`)}
              onDelete={id =>
                apiFetch(`/mandataires/${currentMandataire.id}/commentaires/${id}`, {
                  method: "DELETE"
                })
              }
              onSubmit={formData =>
                apiFetch(`/mandataires/${currentMandataire.id}/commentaires`, {
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
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  allTisForOneMandataire: state.mandataire.allTisForOneMandataire,
  currentEtablissementsForSelectedMandataire:
    state.mandataire.currentEtablissementsForSelectedMandataire
});

export default connect(
  mapStateToProps,
  null
)(connectModal({ name: "FicheMandataireModal", destroyOnHide: true })(FicheMandataireModal));
