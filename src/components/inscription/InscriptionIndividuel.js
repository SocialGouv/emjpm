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
		"Iusername",
		"Ipass1",
		"Ipass2",
		"Inom",
		"Iprenom",
		"Itelephone",
		"Iemail",
		"Iadresse",
		"Iville",
		"Icode_postal",
		"Igenre"
	],
	properties: {
		Iusername: {
			type: "string",
			title: "Identifiant (vous servira pour vous connecter sur E-MJPM)",
			default: ""
		},
		Ipass1: { type: "string", title: "Mot de passe", minLength: 10 },
		Ipass2: { type: "string", title: "Répéter mot de passe", minLength: 10 },
		Inom: { type: "string", title: "Nom", default: "" },
		Iprenom: { type: "string", title: "Prénom", default: "" },
		Itelephone: { type: "string", title: "Téléphone", default: "" },
		Itelephone_portable: { type: "string", title: "Téléphone Portable", default: "" },
		Iemail: { type: "string", title: "Adresse email", default: "" },
		Iadresse: { type: "string", title: "Rue", default: "" },
		Iville: { type: "string", title: "Ville", default: "" },
		Icode_postal: { type: "string", title: "Code Postal", default: "" }
	}
};

const uiSchema = {
	Ipass1: {
		classNames: "input_form_inscription",
		"ui:placeholder": "10 caratères minimum",
		"ui:widget": "password"
	},
	Ipass2: {
		classNames: "input_form_inscription",
		"ui:placeholder": "10 caratères minimum",
		"ui:widget": "password"
	},
	Iusername: {
		classNames: "input_form_inscription",
		"ui:placeholder": "Nom d'utilisateur"
	},
	Inom: {
		classNames: "input_form_inscription",
		"ui:placeholder": "Nom"
	},
	Iprenom: {
		classNames: "input_form_inscription",
		"ui:placeholder": "Prénom"
	},
	Itelephone: {
		classNames: "input_form_inscription",
		"ui:placeholder": "Téléphone"
	},
	Itelephone_portable: {
		classNames: "input_form_inscription",
		"ui:placeholder": "Téléphone Portable"
	},
	Iemail: {
		classNames: "input_form_inscription",
		"ui:placeholder": "Adresse email"
	},
	Iadresse: {
		classNames: "input_form_inscription",
		"ui:placeholder": "Rue"
	},
	Icode_postal: {
		classNames: "input_form_inscription",
		"ui:placeholder": "Code Postal"
	},
	Iville: {
		classNames: "input_form_inscription",
		"ui:placeholder": "Commune"
	}
};

const formData = {};

class InscriptionIndividuel extends React.Component {
	/*onSubmit = ({ formData }) => {
		

		 apiFetch(`/mandataires/1`, {
      method: "PUT",
      body: JSON.stringify({
    	Iusername:
    	Ipass1:
    	Ipass2:
       	Inom:
        Iprenom:
        Itelephone:
        Itelephone_portable:
        Iemail:
        Iadresse:
        Icode_postal:
        Iville:
        
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
							<SearchButton style={{ textAlign: "center" }} type="submit">
								Enregistrer
							</SearchButton>
						</div>
					</Form>
				</b>
			</div>
		);
	}
}

export default InscriptionIndividuel;
