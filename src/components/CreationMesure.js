import Form from "react-jsonschema-form";
import apiFetch from "./Api";
import styled from "styled-components";
import FormInputMesure from "./FormInputMesures";
import getPostCodeCoordinates from "./GetPostCodeCoordinates";

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
  hideShow
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
        />
      </div>
    </div>
  </div>
);

class MesureInput extends React.Component {
  state = {
    showStatus: false
  };

  onSubmit = ({ formData }) => {
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
          });
      })
      .catch(e => {
        throw e;
      });
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
    if (this.state.showStatus === false) {
      this.setState({ showStatus: true });
    } else {
      this.setState({ showStatus: false });
    }
  };

  render() {
    const formData = {};

    const showHide = {
      display: this.state.showStatus === true ? "block" : "none"
    };

    const hideShow = {
      display: this.state.showStatus === false ? "block" : "none",
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
      />
    );
  }
}
export default MesureInput;
