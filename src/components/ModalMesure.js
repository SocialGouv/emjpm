import Form from "react-jsonschema-form";
import styled from "styled-components";
import Modal from "react-modal";


const schema = {
    title: "Ouvrir une nouvelle mesure",
    type: "object",
    required: ["codePostal", "commune", "civilite", "annee", "residence", "ouverture"],
    properties: {
        ouverture: {
            "type": "string",
            "format": "date-time",
            title: "Date d'ordonnance"
        },
        type: {
            type: "string",
            title: "Type de mesure",
            enum: ["Tutelle", "Curatelle", "Sauvegarde de justice", "Mesure ad hoc", "MAJ"]
        },
        residence: { type: "string", title: "Lieu de vie", enum: ["A domicile", "En Etablissement"] },
        codePostal: { type: "string", title: "Code Postal" },
        commune: { type: "string", title: "Commune" },
        civilite: { type: "string", title: "Genre", enum: ["F", "H"] },
        annee: { type: "integer", title: "Année de naissance" }
    }
};

const uiSchema = {
    ouverture: {
        "ui:autofocus": true,
        "ui:title": "Ouverture de la mesure",
        classNames: "input_mesure_ouverture",
        "ui:options": {
            label: true
        }
    },
    codePostal: {
        "ui:placeholder": "Code Postal",
        classNames: "input_mesure_commune",
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

        classNames: "input_mesure_annee",
        "ui:widget": "updown",
        "ui:options": {
            label: false
        }
    },
    civilite: {
        "ui:placeholder": "Genre",
        classNames: "input_mesure_civilite",

        "ui:title": "Le majeur à protéger",
        "ui:options": {
            label: true
        }
    },
    commune: {
        "ui:placeholder": "Commune",
        classNames: "input_mesure_commune",
        "ui:options": {
            label: false
        }
    },
    residence: {
        "ui:placeholder": "Lieu de vie",
        "ui:title": "Résidence du majeur à protéger",
        classNames: "input_mesure_residence",
        "ui:options": {
            label: true
        }
    },
    type: {
        "ui:placeholder": "Type de mesure",
        classNames: "input_mesure_type",
        "ui:options": {
            label: false
        }
    }
};

const CancelButton = styled.button`
  cursor: pointer;
  margin-left: 10px;
`;

const ModalMesure = ({ CustomFieldTemplate,onClick,customStyles, formData,isOpenMesure,onRequestClose, onClickSubmitMesure, onClickClose}) =>
{
        return (
            <Modal
                isOpen={isOpenMesure}
                onRequestClose={onRequestClose}
                contentLabel="mandataire"
                background="#e9ecef"
                style={customStyles}
                className="ModalMesureUpdate"
                overlayClassName="OverlayInput"
            >
                <button onClick={onClick}>X</button>
                <Form
                    schema={schema}
                    uiSchema={uiSchema}
                    FieldTemplate={CustomFieldTemplate}
                    formData={formData}
                    onSubmit={onClickSubmitMesure}
                >
                    <button type="submit" className="btn btn-success">
                        Valider
                    </button>
                    <button onClick={onClickClose} className="btn btn-link  ">
                        Annuler
                    </button>
                </Form>
            </Modal>
        );
    }

export default ModalMesure;
