import fetch from "isomorphic-fetch";
import Form from "react-jsonschema-form";
import styled from "styled-components";
import apiFetch from "../Api";
import RowModal from "../RowModal";
import SearchButton from "../SearchButton";
import piwik from "../../piwik";

function validate(formData, errors) {
	if (formData.pass1 !== formData.pass2) {
		errors.pass2.addError("Mot de passe incorrect");
	}
	return errors;
}
const schema = {
	type: "object",
	required: [
		"Pusername",
		"Ppass1",
		"Ppass2",
		"Pnom",
		"Pprenom",
		"Ptelephone",
		"Pemail",
		"Padresse",
		"Pville",
		"Pcode_postal",
		"Pgenre"
	],
	properties: {
		Pusername: {
			type: "string",
			title: "Identifiant (vous servira pour vous connecter sur E-MJPM)",
			default: ""
		},
		Ppass1: { type: "string", title: "Mot de passe", minLength: 10 },
		Ppass2: { type: "string", title: "Répéter mot de passe", minLength: 10 },
		Pnom: { type: "string", title: "Nom", default: "" },
		Pprenom: { type: "string", title: "Prénom", default: "" },
		Ptelephone: { type: "string", title: "Téléphone", default: "" },
		Ptelephone_portable: { type: "string", title: "Téléphone Portable", default: "" },
		Pemail: { type: "string", title: "Adresse email", default: "" },
		Padresse: { type: "string", title: "Rue", default: "" },
		Pville: { type: "string", title: "Ville", default: "" },
		Pcode_postal: { type: "string", title: "Code Postal", default: "" },
		Petablissement: { type: "string", title: "Nom d'Etablissements", default: "" }
	}
};

const uiSchema = {
	Ppass1: {
		classNames: "input_form_inscription",
		"ui:placeholder": "10 caratères minimum",
		"ui:widget": "password"
	},
	Ppass2: {
		classNames: "input_form_inscription",
		"ui:placeholder": "10 caratères minimum",
		"ui:widget": "password"
	},
	Pusername: {
		classNames: "input_form_inscription",
		"ui:placeholder": "Nom d'utilisateur"
	},
	Pnom: {
		classNames: "input_form_inscription",
		"ui:placeholder": "Nom"
	},
	Pprenom: {
		classNames: "input_form_inscription",
		"ui:placeholder": "Prénom"
	},
	Ptelephone: {
		classNames: "input_form_inscription",
		"ui:placeholder": "Téléphone"
	},
	Ptelephone_portable: {
		classNames: "input_form_inscription",
		"ui:placeholder": "Téléphone Portable"
	},
	Pemail: {
		classNames: "input_form_inscription",
		"ui:placeholder": "Adresse email"
	},
	Padresse: {
		classNames: "input_form_inscription",
		"ui:placeholder": "Rue"
	},
	Pcode_postal: {
		classNames: "input_form_inscription",
		"ui:placeholder": "Code Postal"
	},
	Pville: {
		classNames: "input_form_inscription",
		"ui:placeholder": "Commune"
	},
	Petablissement: {
		classNames: "input_form_inscription",
		"ui:placeholder": "Nom d'Etablissements"
	}
};

const formData = {};

class InscriptionPrepose extends React.Component {
	/*onSubmit = ({ formData }) => {
		

		 apiFetch(`/mandataires/1`, {
      method: "PUT",
      body: JSON.stringify({
    	Pusername:
    	Ppass1:
    	Ppass2:
       	Pnom:
        Pprenom:
        Ptelephone:
        Ptelephone_portable:
        Pemail:
        Padresse:
        Pcode_postal:
        Pville:
        
      })
    }).then(json => {
     //piwik
     // this.props.updateMadataire(json);
    });
	};*/

	render() {
		return (
			<div>
				<br />
				<h2 style={{ margin: 20 }}>
					Veuillez renseigner ci-dessous vos informations professionelles:
				</h2>
				<br />
				<b>
					<Form
						schema={schema}
						formData={formData}
						uiSchema={uiSchema}
						validate={validate}
						showErrorList={false}
					>
						<div
							style={{ textAlign: "left", paddingBottom: "10px", marginLeft: "20px" }}
						>
							<SearchButton type="submit">Enregistrer</SearchButton>
						</div>
					</Form>
				</b>
			</div>
		);
	}
}

export default InscriptionPrepose;
