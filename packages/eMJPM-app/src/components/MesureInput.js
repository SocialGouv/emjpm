import Form from "react-jsonschema-form";
import TableMesure from "./TableMesure";
import apiFetch from "./Api";

const schema = {
  title: "",
  type: "object",
  required: ["type", "codePostal", "commune", "civilite", "annee", "residence"],
  properties: {
    ouverture: {
      type: "string",
      title: "Ouverture de la mesure",

    },
    type: {
      type: "string",
      enum: ["Curatelle", "Curatelle renforcée", "Tutelle", "Protetion de Justice"]
    },
    codePostal: { type: "string", title: "Code Postal" },
    commune: { type: "string", title: "Commune" },
    civilite: { type: "string", enum: ["Madame", "Monsieur"] },
    annee: { type: "integer" },
    residence: { type: "string", enum: ["A Domicile", "En Etablissement"] }
  }
};

const uiSchema = {
  ouverture: {
    "ui:widget": "date" // could also be "select"
  }
};

const getPostCodeCoordinates = postCode => {
  console.log(postCode);
  console.log(111);
  // return null if no input
  if (!postCode || !postCode.trim()) {
    return Promise.resolve(null);
  }
  return fetch(`https://api-adresse.data.gouv.fr/search/?q=postcode=${postCode}`)
    .then(response => response.json())
    .then(json => json);
};

class MesureInput extends React.Component {
  state = {
    data: [],
    datamesure: [],
    currentMandataire: "",
    showResults: false,
    postcodeCoordinates: ""
  };

  findPostcode = postCode =>
    getPostCodeCoordinates(postCode).then(coordinates =>
      this.setState({
        postcodeCoordinates: coordinates
      })
    );


  onSubmit = ({ formData }) => {
    console.log(this.state.postcodeCoordinates);
    console.log(222);
    console.log(getPostCodeCoordinates(formData.codePostal));
    console.log(333);
    this.findPostcode(formData.codePostal);
    console.log(formData);
    console.log(this.findPostcode(formData.codePostal));
    console.log(this.state.postcodeCoordinates);



      apiFetch(`/mandataires/1/mesures`,{
        method: "POST",
        body: JSON.stringify({
        code_postal: formData.codePostal,
        ville: formData.commune,
        etablissement: "hello",
        latitude: 1,
        longitude: 1,
        mandataire_id: 1,
        annee: formData.annee,
        type: formData.type,
        date_ouverture: formData.ouverture,
        residence: formData.residence,
        civilite: formData.civilite
        // longitude: this.state.postcodeCoordinates[0],
        // latitude: this.state.postcodeCoordinates[1],
      })
    }).then(json => {
        this.setState({
          datamesure: json
        });
      });
  };

  render() {
    return (
      <div>
        <Form schema={schema} uiSchema={uiSchema} onSubmit={this.onSubmit} />;
      </div>
    );
  }
}

export default MesureInput;
