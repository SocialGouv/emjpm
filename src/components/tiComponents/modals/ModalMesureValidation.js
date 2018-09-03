import { connect } from "react-redux";
import { connectModal } from "redux-modal";

import Layout from "../../mandataires/modals/Layout";

const ModalMesureValidation = ({ show, handleHide }) => {
  return (
    <Layout show={show} handleHide={handleHide}>
      <div style={{ padding: "30px" }}>
        <h2>Attribution d'une nouvelle mesure</h2>
        <br />
        L'attribution de mesure à bien été envoyée.
        <button onClick={handleHide} className="btn btn-link" data-cy="button-validation">
          Continuer
        </button>
      </div>
    </Layout>
  );
};

const mapStateToProps = state => ({
  allTisForOneMandataire: state.mandataire.allTisForOneMandataire
});

export default connect(
  mapStateToProps,
  null
)(connectModal({ name: "ModalMesureValidation", destroyOnHide: true })(ModalMesureValidation));
