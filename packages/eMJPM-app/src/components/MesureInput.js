import Form from "react-jsonschema-form";
import TableMesure from "./TableMesure";
import apiFetch from "./Api";
import Modal from "react-modal";


const schema = {
  title: "",
  type: "object",
  required: ["type", "codePostal", "commune", "civilite", "annee", "residence"],
  properties: {
    ouverture: {
      type: "string",
      title: "Ouverture de la mesure"
    },
    type: {
      type: "string",
      enum: ["Curatelle", "Curatelle renforcée", "Tutelle", "Protetion de Justice"]
    },
    codePostal: { type: "string", title: "Code Postal" },
      etablissement: { type: "string", title: "Etablissement" },
    commune: { type: "string", title: "Commune" },
    civilite: { type: "string", enum: ["F", "M"] },
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
const formData = {}

class MesureInput extends React.Component {
  state = {
    data: [],
    datamesure: [],
    currentMandataire: "",
    showResults: false,
    postcodeCoordinates: "",
      resultcapcite: "",
      modalIsOpen: false
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
        apiFetch(`/mandataires/1/mesures`, {
            method: "POST",
            body: JSON.stringify({
                code_postal: formData.codePostal,
                ville: formData.commune,
                etablissement: formData.etablissement,
                latitude: coordinates.features[0].geometry.coordinates[0],
                longitude: coordinates.features[0].geometry.coordinates[1],
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
      this.closeModal()
  };

    openModal = mandataire => {
        this.setState({ modalIsOpen: true });
    };
    closeModal = () => {
        this.setState({ modalIsOpen: false });
    };

  render() {

      const formData ={}



    return (
      <div>
                  <button
                      type="button"
                      className="btn btn-success mesure_button"
                      onClick={this.openModal}
                      style={{ align: "left" }}
                  >
                      Ouvrir une nouvelle mesure
                  </button>

          <Modal
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.closeModal}
              contentLabel="mandataire"
              background="#e9ecef"
              className="ModalInputMesure"
              overlayClassName="Overlay"
          >
              <button onClick={this.closeModal}>X</button>
              <div style={{ textAlign: "center" }}>
                  <Form schema={schema} uiSchema={uiSchema} formData={formData} onSubmit={this.onSubmit} >
                      <button type="submit" className="btn btn-success">
                          Valider
                      </button>
                  </Form>
              </div>
          </Modal>
      </div>
    );
  }
}

export default MesureInput;
