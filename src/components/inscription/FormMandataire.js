import Form from "react-jsonschema-form";
import SearchButton from "../communComponents/SearchButton";

function validate(formData, errors) {
  if (formData.pass1 !== formData.pass2) {
    errors.pass2.addError("Mot de passe incorrect");
  }
  return errors;
}

const FormMandataire = ({ schema, formData, uiSchema = {}, onSubmit }) => (
  <div>
    <div style={{ fontSize: "1.2em", fontWeight: "bold", margin: 20 }}>
      Veuillez renseigner ci-dessous vos informations professionnelles:
    </div>
    <Form
      schema={schema}
      formData={formData}
      uiSchema={uiSchema}
      validate={validate}
      showErrorList={false}
      onSubmit={onSubmit}
    >
      <div style={{ textAlign: "center", paddingBottom: "10px", marginLeft: "20px" }}>
        <SearchButton style={{ textAlign: "center" }} type="submit">
          Créer mon compte
        </SearchButton>
      </div>
    </Form>
  </div>
);

export default FormMandataire;
