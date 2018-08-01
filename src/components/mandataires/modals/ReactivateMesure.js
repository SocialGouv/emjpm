import { connectModal } from "redux-modal";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Button } from "../..";

import { reactivateMesure } from "../actions/mesures";
import Layout from "./Layout";

const ReactivateMesure = ({ show, handleHide, onSubmit, id, ...props }) => {
  return (
    <Layout show={show} handleHide={handleHide}>
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <h3>Réactiver la mesure? </h3>
        <br />
        <br />
        <div style={{ margin: "20px 0", textAlign: "center" }}>
          <Button data-cy="button-modal-reactivate-mesure" onClick={() => onSubmit(id)}>
            Réactiver la Mesure
          </Button>
        </div>
      </div>
    </Layout>
  );
};

const mapDispatchToProps = (dispatch, ownProps) =>
  bindActionCreators({ onSubmit: data => reactivateMesure({ id: data }) }, dispatch);

// connect to redux store actions
// connect to redux-modal
export default connect(
  null,
  mapDispatchToProps
)(connectModal({ name: "ReactivateMesure", destroyOnHide: true })(ReactivateMesure));
