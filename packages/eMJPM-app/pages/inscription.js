import { Home, Map, User, UserMinus } from "react-feather";
import Navigation from "../src/components/Navigation";
import Footer from "../src/components/Footer";
import InscriptionIndividuel from "../src/components/inscription/InscriptionIndividuel";
import InscriptionPrepose from "../src/components/inscription/InscriptionPrepose";
import InscriptionService from "../src/components/inscription/InscriptionService";
import InscriptionChoixTiRegion from "../src/components/inscription/InscriptionChoixTiRegion";

class InscriptionForm extends React.Component {
	state = {
		form: null
	};

	getForm = () => {
		if (this.state.form === "Individuel") {
			return <InscriptionIndividuel style={{ width: "80%" }} />;
		} else if (this.state.form === "Prepose") {
			return <InscriptionPrepose style={{ width: "80%" }} />;
		} else if (this.state.form === "Service") {
			return <InscriptionService style={{ width: "80%" }} />;
		}
	};

	setForm = e => {
		this.setState({ form: e.target.value });
	};

	render() {
		const form = this.getForm();

		return (
			<div className="container">
				<div className="col-12 offset-sm-2 col-sm-8 offset-md-2 col-md-8">
					<h1 style={{ margin: 20 }}>Inscription</h1>
					<div style={{ backgroundColor: "white", padding: 5 }}>
						<InscriptionChoixTiRegion />

						<form>
							<div>
								<h2 style={{ margin: 15 }}>Vous êtes un mandataire :</h2>
								<table
									style={{
										margin: 20,
										width: "100%",
										marginTop: "20px",
										marginBottom: "20px",
										fontSize: 14
									}}
								>
									<tr>
										<td>
											<label>
												<input
													type="radio"
													name="form_selector"
													value="Individuel"
													onChange={this.setForm}
												/>
												Individuel
											</label>
										</td>
										<td>
											<label>
												<input
													type="radio"
													name="form_selector"
													value="Prepose"
													onChange={this.setForm}
												/>
												Préposé
											</label>
										</td>
										<td>
											<label>
												<input
													type="radio"
													name="form_selector"
													value="Service"
													onChange={this.setForm}
												/>
												Service
											</label>
										</td>
									</tr>
								</table>
								{form}
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

const Inscription = () => (
	<div style={{ display: "block", backgroundColor: "#cad4de", minHeight: "100%" }}>
		<Navigation />
		<InscriptionForm />
		<Footer />
	</div>
);
export default Inscription;
