import styled from "styled-components";

import FormInput from "./FormInput";
import SearchButton from "./SearchButton";

const FormFilterMandataire = ({ props }) => {
	return (
		<Presentation>
			<div style={{ marginLeft: "5px" }}>
				<Title> Rechercher par lieu de rattachement </Title>
				<tr className="form-inline">
					<td>
						<FormInput
							size="120"
							id="code_postal"
							name="code_postal"
							placeholder="Code postal"
						/>
					</td>
					<td>
						<FormInput size="260" id="commune" name="commune" placeholder="Commune" />
					</td>
				</tr>
				<Title> Rechercher par zone d'intervention </Title>
				<tr className="form-inline">
					<td>
						<FormInput
							size="120"
							id="code_postal"
							name="code_postal"
							placeholder="Code postal"
						/>
					</td>
					<td>
						<FormInput size="260" id="commune" name="commune" placeholder="Commune" />
					</td>
				</tr>
				<Title> Rechercher par professionnel </Title>
				<tr className="form-inline">
					<td>
						<FormInput
							size="385"
							id="nameOrService"
							name="nameOrService"
							placeholder="Nom de la personne ou du service"
						/>
					</td>
					<div
						className="custom-control custom-radio custom-control-inline"
						style={{ marginLeft: "20px" }}
					>
						<label style={{ cursor: "pointer" }} for="customRadioInline1">
							<input
								type="radio"
								id="customRadioInline1"
								name="customRadioInline"
								style={{ margin: "5px" }}
							/>Individuels
						</label>
					</div>
					<div className="custom-control custom-radio custom-control-inline">
						<label style={{ cursor: "pointer" }} for="customRadioInline2">
							<input
								type="radio"
								id="customRadioInline2"
								name="customRadioInline"
								style={{ margin: "5px" }}
							/>Préposés
						</label>
					</div>
					<div className="custom-control custom-radio custom-control-inline">
						<label style={{ cursor: "pointer" }} for="customRadioInline3">
							<input
								type="radio"
								id="customRadioInline3"
								name="customRadioInline"
								style={{ margin: "5px" }}
							/>Services
						</label>
					</div>
				</tr>
				<SearchButton align="center" type="submit" style={{ marginTop: "20px" }}>
					Rechercher
				</SearchButton>
			</div>
		</Presentation>
	);
};
const Title = styled.label`
	font-weight: Bold;
	padding-left: 5px;
	margin-top: 15px;
	font-weight: 16px;
`;
const Presentation = styled.div`
	background: #ebeff3;
	border-radius: 5px;
	border: 1px solid #ebeff3;
	padding: 5px;
	width: 100%;
	height: 335px;
	font-weight: 14px;
`;
export default FormFilterMandataire;
