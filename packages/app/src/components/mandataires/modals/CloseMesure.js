import Form from "react-jsonschema-form";

import { connectModal } from "redux-modal";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { format } from "date-fns";

import { closeMesure } from "../actions/mesures";
import Layout from "../../communComponents/ModalLayout";

const schema = {
  type: "string",
  format: "date"
};

const uiSchema = {
  "ui:options": {
    label: false
  }
};

const CloseMesure = ({ show, handleHide, onSubmit, id, ...props }) => {
  const onSubmitted = ({ formData }) => {
    onSubmit({
      date: formData,
      id
    });
  };
  return (
    <Layout show={show} handleHide={handleHide}>
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <h3>Eteindre la mesure? </h3>
        <br />
        <p style={{ padding: 20 }}>
          Une fois cette opération effectuée, vous retrouverez cette mesure éteinte dans
          l&apos;onglet correspondant, mais vous ne pourrez plus la modifier.
        </p>
        <Form
          schema={schema}
          uiSchema={uiSchema}
          onSubmit={onSubmitted}
          formData={format(new Date(), "YYYY-MM-DD")}
        >
          <div style={{ margin: "20px 0", textAlign: "center" }}>
            <button type="submit" className="btn btn-success" style={{ padding: "10px 30px" }}>
              Eteindre la mesure
            </button>
          </div>
        </Form>
      </div>
    </Layout>
  );
};

const mapDispatchToProps = (dispatch, ownProps) =>
  bindActionCreators({ onSubmit: closeMesure }, dispatch);

// connect to redux store actions
// connect to redux-modal
export default connect(
  null,
  mapDispatchToProps
)(connectModal({ name: "CloseMesure", destroyOnHide: true })(CloseMesure));
