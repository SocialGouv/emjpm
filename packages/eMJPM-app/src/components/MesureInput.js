import Form from "react-jsonschema-form";
import TableMesure from "./TableMesure";

const schema = {
    title: "",
    type: "object",
    required: [""],
    properties: {
        ouverture: {
            type: "string",
            title: "Ouverture de la mesure",
            default: "A new task"
        },
        type: { type: "string", title: "Type de mesure", default: false },
        codePostal: { type: "string", title: "Code Postal", default: false },
        commune: { type: "string", title: "Commune", default: false },
        civilite: { type: "string", title: "Type de mesure", default: false },
        annee: { type: "string", title: "Type de mesure", default: false },
        residence: { type: "string", title: "Residence", default: false }
    }
};

const uiSchema = {
    ouverture: {
        "ui:widget": "date" // could also be "select"
    },
    annee: {
        "ui:widget": "date" // could also be "select"
    }
};

const getPostCodeCoordinates = postCode => {
    // return null if no input
    if (!postCode || !postCode.trim()) {
        return Promise.resolve(null);
    }
    return fetch(
        `https://api-adresse.data.gouv.fr/search/?q=postcode=${postCode}`
    )
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
        this.findPostcode(formData.commune);
        const url = "http://localhost:3005/api/v1/mesures";
        fetch(url, {
            method: "POST",
            headers: {
                "Access-Control-Allow-Credentials": "true",
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                code_postal: formData.codePostal,
                ville: formData.commune,
                annee: formData.annee,
                type: formData.type,
                date_ouverture: formData.ouverture,
                residence: formData.residence,
                civilite: formData.civilite,
                longitude: this.state.postcodeCoordinates[0],
                latitude: this.state.postcodeCoordinates[1],
                mandataire_id: 1
            })
        })
            .then(response => response.json())
            .then(json => {
                this.setState({
                    datamesure: json
                });
            });
    };

    render() {
        return <Form schema={schema} onSubmit={this.onSubmit} />;
    }
}

export default MesureInput;
