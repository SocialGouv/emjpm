import { connect } from "react-redux";
import * as React from "react";
import styled from "styled-components";
import Commentaire from "../Commentaire";
import RowModal from "../../communComponents/RowModal";
import { connectModal } from "redux-modal";
import Layout from "./Layout";

const TitleMandataire = styled.div`
  text-align: left;
  font-size: 1.5em;
  font-weight: bold;
`;

class FicheMandataireModal extends React.Component {
  render() {
    console.log(this.props.allTisForOneMandataire);
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
        <Commentaire currentMandataire={mandataire} />
      </div>
    </div>
  </div>
);

const mapStateToProps = state => ({
  allTisForOneMandataire: state.mandataire.allTisForOneMandataire,
  currentEtablissementsForSelectedMandataire:
    state.mandataire.currentEtablissementsForSelectedMandataire
});
// allTisForOneMandataire: state.mandataire.allTisForOneMandataire,
// currentEtablissementsForSelectedMandataire:
//   state.mandataire.currentEtablissementsForSelectedMandataire

export default connect(
  mapStateToProps,
  null
)(connectModal({ name: "FicheMandataireModal", destroyOnHide: true })(FicheMandataireModal));
