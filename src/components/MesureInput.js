import Form from "react-jsonschema-form";
import TableMesure from "./mandataireComponents/TableMesure";
import apiFetch from "./communComponents/Api";
import Modal from "react-modal";

const schema = {
  title: "Ouverture de mesure",
  type: "object",
  required: ["codePostal", "commune", "civilite", "annee", "residence", "ouverture"],
  properties: {
    ouverture: {
      type: "string",
      title: "Date d'ordonnance"
    },
    type: {
      type: "string",
      title: "Type de mesure",
      enum: ["Tutelle", "Curatelle", "Sauvegarde de justice", "Mesure ad hoc", "MAJ"]
    },
    codePostal: { type: "string", title: "Code Postal" },
    etablissement: { type: "string", title: "Etablissement" },
    commune: { type: "string", title: "Commune" },
    civilite: { type: "string", title: "Genre", enum: ["F", "H"] },
    annee: { type: "integer", title: "Année de naissance" },
    residence: { type: "string", title: "Lieu de vie", enum: ["A domicile", "En établissement"] }
  }
};
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

const uiSchema = {
  ouverture: {
    "ui:autofocus": true,
    "ui:placeholder": "Code Postal",
    "ui:widget": "date",
    "ui:options": {
      label: false
    }
  },
  codePostal: {
    "ui:placeholder": "Code Postal",
    "ui:options": {
      label: false
    }
  },
  etablissement: {
    "ui:placeholder": "Etablissement",
    "ui:options": {
      label: false
    }
  },
  annee: {
    "ui:placeholder": "Année de naissance",
    "ui:options": {
      label: false
    }
  },
  civilite: {
    "ui:placeholder": "Genre",
    "ui:options": {
      label: false
    }
  },
  commune: {
    "ui:placeholder": "Commune",
    "ui:options": {
      label: false
    }
  },
  residence: {
    "ui:placeholder": "Lieu de vie",
    "ui:options": {
      label: false
    }
  },
  type: {
    "ui:placeholder": "Type de mesure",
    "ui:options": {
      label: false
    }
  }
};

const getPostCodeCoordinates = postCode => {
  console.log(postCode);
  console.log(111);
  // return null if no input
  if (!postCode || !postCode.trim()) {
    return Promise.resolve(null);
  }
  return fetch(`https://api-adresse.data.gouv.fr/search/?q=postcode=${postCode}`).then(response =>
    response.json()
  );
  // .then(json => json);
};
const formData = {};

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
    getPostCodeCoordinates(postCode).then(
      coordinates => console.log("coordinates", coordinates, postCode),
      this.setState({
        postcodeCoordinates: coordinates
      })
    );

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
            // longitude: this.state.postcodeCoordinates[0],
            // latitude: this.state.postcodeCoordinates[1],
          })
        })
          .then(json => {
            console.log(json);
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
    this.closeModal();
  };

  openModal = mandataire => {
    this.setState({ modalIsOpen: true });
  };
  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    const formData = {};

    return (
      <div>
        <button
          type="button"
          className="btn btn-success mesure_button"
          onClick={this.openModal}
          style={{ align: "left" }}
        >
          Ouvrir une mesure
        </button>

        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="mandataire"
          background="#e9ecef"
          style={customStyles}
          className="ModalInputMesure"
          overlayClassName="OverlayInput"
        >
          <button onClick={this.closeModal}>X</button>
          <div style={{ textAlign: "center" }}>
            <Form schema={schema} uiSchema={uiSchema} formData={formData} onSubmit={this.onSubmit}>
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
