import { connect } from "react-redux";
import { connectModal } from "redux-modal";

import Layout from "./Layout";

const ModalMesureValidation = ({ show, handleHide }) => {
  return (
    <Layout show={show} handleHide={handleHide}>
      <h2>Attribution d'une nouvelle mesure</h2>
      <br />
      L'attribution de mesure à bien été envoyée.
      <button onClick={handleHide} className="btn btn-link  ">
        Continuer
      </button>
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
