import Form from "react-jsonschema-form";
import SearchButton from "../communComponents/SearchButton";

function validate(formData, errors) {
  if (formData.pass1 !== formData.pass2) {
    errors.pass2.addError("Mot de passe incorrect");
  }
  return errors;
}

class FormMandataire extends React.Component {
  constructor(props) {
    super(props);
    this.state = { typeMandataire: this.props.typeMandataire };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.typeMandataire != nextState.typeMandataire;
  }

  render() {
    const { schema, formData, onSubmit ,uiSchema} = this.props;
    return (
      <div>
        <div style={{ fontSize: "1.2em", fontWeight: "bold", margin: "20px 0" }}>
          Renseignez ci-dessous vos informations professionnelles:
        </div>
        <Form
          schema={schema}
          formData={formData}
          uiSchema={uiSchema}
          validate={validate}
          showErrorList={false}
          onSubmit={onSubmit}
        >
          <div style={{ textAlign: "center", paddingBottom: "10px" }}>
            <SearchButton style={{ textAlign: "center" }} type="submit">
              Créer mon compte
            </SearchButton>
          </div>
        </Form>
      </div>
    );
  }
}

export default FormMandataire;
