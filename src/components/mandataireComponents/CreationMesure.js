import styled from "styled-components";

import FormInputMesure from "./FormInputMesures";
import getPostCodeCoordinates from "../communComponents/GetPostCodeCoordinates";
import apiFetch from "../communComponents/Api";
import LieuxDeVie from "./LieuxDeVie";

const ModalPres = styled.div`
  padding: 15px;
  margin-right: 25px;
  border: 1px solid black;
  background: #f9f9f9;
  border-radius: 5px;
`;

export const FormMesure = ({
  OpenCreationMesure,
  CustomFieldTemplate,
  onSubmit,
  formData,
  showHide,
  hideShow,
  error,
  success,
  status,
  value,
  updateValue,
  updateLieuxDeVie,
  lieuxDeVie,
  etablissement,
  onChange,
  formDataState
}) => (
  <div>
    <button
      style={{ display: "inline", ...hideShow }}
      type="button"
      className="btn btn-success mesure_button"
      onClick={OpenCreationMesure}
    >
      Enregistrer une nouvelle mesure
    </button>

    <div style={showHide}>
      <ModalPres>
        <div style={{ width: "600px" }}>
          <FormInputMesure
            CustomFieldTemplate={CustomFieldTemplate}
            formData={formData}
            onSubmit={onSubmit}
            showReplyForm={OpenCreationMesure}
            error={error}
            status={status}
            success={success}
            value={value}
            lieuxDeVie={lieuxDeVie}
            updateLieuxDeVie={updateLieuxDeVie}
            updateValue={updateValue}
            etablissement={etablissement}
            onChange={onChange}
            formDataState={formDataState}
          >
            <LieuxDeVie
              {...this.props}
              value={value}
              lieuxDeVie={lieuxDeVie}
              updateLieuxDeVie={updateLieuxDeVie}
              updateValue={updateValue}
              etablissement={etablissement}
            />
          </FormInputMesure>
        </div>
      </ModalPres>
    </div>
  </div>
);

class MesureInput extends React.Component {
  state = {
    showForm: false,
    error: null,
    status: null,
    success: null,
    value: "",
    valueId: "",
    lieuxDeVie: "",
    etablissement: "",
    formData: ""
  };

  componentDidMount() {
    apiFetch("/mandataires/1/etablissements")
      .then(finess => {
        this.setState({
          etablissement: finess
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  onSubmit = ({ formData }) => {
    this.setState(
      {
        error: null,
        status: "loading"
      },
      () => {
        // TODO: use server-side data
        getPostCodeCoordinates(formData.codePostal)
          .then(coordinates => {
            return apiFetch(`/mandataires/1/mesures`, {
              method: "POST",
              body: JSON.stringify({
                code_postal: formData.codePostal,
                ville: formData.commune,
                etablissement_id: this.state.valueId,
                latitude: coordinates.features[0].geometry.coordinates[1],
                longitude: coordinates.features[0].geometry.coordinates[0],
                annee: formData.annee,
                type: formData.type,
                date_ouverture: formData.ouverture,
                residence: this.state.lieuxDeVie,
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
              .then(json => {
                // TODO: use trigger
                return apiFetch(`/mandataires/1`, {
                  method: "PUT",
                  body: JSON.stringify({
                    updateMesure: new Date()
                  })
                }).then(() => {
                  return json;
                });
              })
              .then(json2 => {
                this.setState(
                  {
                    status: "success",
                    error: null,
                    success: " La mesure a été créée"
                  },
                  () => {
                    this.props.updateMesure(json2);
                  }
                );
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
      this.setState({ showForm: true, error: null, success: null, status: null });
    } else {
      this.setState({ showForm: false, error: null, success: null, status: null });
    }
  };

  updateValue = ({ value, valueId }) => {
    this.setState({ value: value, valueId: valueId });
  };

  updateLieuxDeVie = ({ lieuxDeVie }) => {
    this.setState({ lieuxDeVie: lieuxDeVie });
  };

  onChange = ({ formData }) => {
    this.setState({ formData: formData });
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
        success={this.state.success}
        status={this.state.status}
        value={this.state.value}
        lieuxDeVie={this.state.lieuxDeVie}
        updateLieuxDeVie={this.updateLieuxDeVie}
        updateValue={this.updateValue}
        etablissement={this.state.etablissement}
        onChange={this.onChange}
        formDataState={this.state.formData}
      />
    );
  }
}
export default MesureInput;
