import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { connectModal } from "redux-modal";

import { Button } from "../..";
import Layout from "../../communComponents/ModalLayout";
import { reactivateMesure } from "../actions/mesures";

const ReactivateMesure = ({ show, handleHide, onSubmit, id, mandataire_id }) => {
  return (
    <Layout show={show} handleHide={handleHide}>
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <h3>Voulez-vous réactiver la mesure ? </h3>
        <br />
        <br />
        <div style={{ margin: "20px 0", textAlign: "center" }}>
          <Button
            data-cy="button-modal-reactivate-mesure"
            onClick={() => onSubmit({ id: id, mandataire_id: mandataire_id })}
          >
            Cliquez ici
          </Button>
        </div>
      </div>
    </Layout>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { onSubmit: data => reactivateMesure({ id: data.id, mandataire_id: data.mandataire_id }) },
    dispatch
  );

// connect to redux store actions
// connect to redux-modal
export default connect(
  null,
  mapDispatchToProps
)(connectModal({ name: "ReactivateMesure", destroyOnHide: true })(ReactivateMesure));
