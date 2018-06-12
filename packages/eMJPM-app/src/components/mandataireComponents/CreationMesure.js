import Form from "react-jsonschema-form";
import apiFetch from "../communComponents/Api";
import styled from "styled-components";
import FormInputMesure from "../FormInputMesures";
import getPostCodeCoordinates from "../communComponents/GetPostCodeCoordinates";

const CancelButton = styled.button`
  cursor: pointer;
  margin-left: 10px;
`;

const CancelX = styled.button`
  cursor: pointer;
  margin-left: 10px;
  content-align: right;
  color: grey;
  padding: 0px;
  font-size: 1.3em;
`;

const CancelButtonX = styled.div`
  text-align: "right";
`;

const formData = {};

export const FormMesure = ({
  OpenCreationMesure,
  CustomFieldTemplate,
  onSubmit,
  formData,
  showHide,
  hideShow,
  error,
  status
}) => (
  <div>
    <button
      type="button"
      className="btn btn-success mesure_button"
      onClick={OpenCreationMesure}
      style={hideShow}
    >
      Ouvrir une mesure
    </button>

    <div style={showHide}>
      <CancelButtonX>
        <CancelX onClick={OpenCreationMesure} className="btn btn-link">
          X
        </CancelX>
      </CancelButtonX>
      <div style={{ width: "600px" }}>
        <FormInputMesure
          CustomFieldTemplate={CustomFieldTemplate}
          formData={formData}
          onSubmit={onSubmit}
          showReplyForm={OpenCreationMesure}
          error={error}
          status={status}
        />
      </div>
    </div>
  </div>
);

class MesureInput extends React.Component {
  state = {
    showForm: false,
    error: null,
    status: null
  };

  onSubmit = ({ formData }) => {
    this.setState(
      {
        error: null,
        status: "loading"
      },
      () => {
        getPostCodeCoordinates(formData.codePostal)
          .then(coordinates => {
            return apiFetch(`/mandataires/1/mesures`, {
              method: "POST",
              body: JSON.stringify({
                code_postal: formData.codePostal,
                ville: formData.commune,
                etablissement: formData.etablissement,
                latitude: coordinates.features[0].geometry.coordinates[1],
                longitude: coordinates.features[0].geometry.coordinates[0],
                annee: formData.annee,
                type: formData.type,
                date_ouverture: formData.ouverture,
                residence: formData.residence,
                civilite: formData.civilite,
                status: "Mesure en cours"
              })
            })
              .then(json => {
                return apiFetch(`/mandataires/1/capacite`, {
                  method: "PUT"
                }).then(() => {
                  return json;
                });
              })
              .then(json2 => {
                this.props.updateMesure(json2);
                this.setState({
                  status: "success",
                  error: " La mesure a été crée"
                });
              });
          })
          .catch(e => {
            this.setState({
              status: "error",
              error: "Impossible de créer la mesure"
            });
            throw e;
          });
      }
    );
  };

  CustomFieldTemplate = props => {
    const {
      id,
      classNames,
      label,
      help,
      required,
      displayLabel,
      description,
      errors,
      children
    } = props;
    return (
      <div className={classNames}>
        <label htmlFor={id}>
          {displayLabel ? label : null}
          {required ? null : null}
        </label>
        {description}
        {children}
        {errors}
        {help}
      </div>
    );
  };

  OpenCreationMesure = () => {
    if (this.state.showForm === false) {
      this.setState({ showForm: true });
    } else {
      this.setState({ showForm: false });
    }
  };

  render() {
    const formData = {};

    const showHide = {
      display: this.state.showForm === true ? "block" : "none"
    };

    const hideShow = {
      display: this.state.showForm === false ? "block" : "none",
      align: "left"
    };
    return (
      <FormMesure
        OpenCreationMesure={this.OpenCreationMesure}
        CustomFieldTemplate={this.CustomFieldTemplate}
        onSubmit={this.onSubmit}
        formData={formData}
        showHide={showHide}
        hideShow={hideShow}
        error={this.state.error}
        status={this.state.status}
      />
    );
  }
}
export default MesureInput;
