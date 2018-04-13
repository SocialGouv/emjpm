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
      etablissement: { type: "string", title: "Etablissement" },
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
   // .then(json => json);
};

class MesureInput extends React.Component {
  state = {
    data: [],
    datamesure: [],
    currentMandataire: "",
    showResults: false,
    postcodeCoordinates: "",
      resultcapcite: ""
  };

  findPostcode = postCode =>
    getPostCodeCoordinates(postCode).then(coordinates =>
        console.log('coordinates', coordinates, postCode),
      this.setState({
        postcodeCoordinates: coordinates
      })
    );


  onSubmit = ({ formData }) => {
    getPostCodeCoordinates(formData.codePostal).then(coordinates => {
      console.log(coordinates);
        apiFetch(`/mandataires/1/mesures`, {
            method: "POST",
            body: JSON.stringify({
                code_postal: formData.codePostal,
                ville: formData.commune,
                etablissement: formData.etablissement,
                latitude: coordinates[0],
                longitude: coordinates[1],
                annee: formData.annee,
                type: formData.type,
                date_ouverture: formData.ouverture,
                residence: formData.residence,
                civilite: formData.civilite,
                status: "Mesure en cours"
                // longitude: this.state.postcodeCoordinates[0],
                // latitude: this.state.postcodeCoordinates[1],
            })
        }).then(json => {
            return apiFetch(`/mandataires/1/capacite`, {
                method: "PUT"
            }).then(() => {
              return json
            })
        }).then(json2 => {
            this.props.updateMesure(json2);
        }).catch(e => {
          console.log(e)
            throw e
        })
    })
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
