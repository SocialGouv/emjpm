import Navigation from "../src/components/Navigation";
import Footer from "../src/components/Footer";
import { Home, Map, User, UserMinus } from "react-feather";
import InscriptionMandataire from "../src/components/inscription/InscriptionMandataire";
import InscriptionService from "../src/components/inscription/InscriptionService";
import InscriptionTi from "../src/components/inscription/InscriptionTi";

class InscriptionForm extends React.Component {
	state = {
		form: null
	};

	getForm = () => {
		if (this.state.form === "Mandataire") {
			return <InscriptionMandataire />;
		} else if (this.state.form === "Service") {
			return <InscriptionService />;
		} else if (this.state.form === "ti") {
			return <InscriptionTi />;
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
					<h1>Inscription</h1>
					<div style={{ backgroundColor: "white", padding: 5 }}>
						<form>
							<div>
								<h2>De quelle secteur d'activité faites vous partie ?</h2>
								<label>
									<input
										type="radio"
										name="form_selector"
										value="Mandataire"
										style={{ fontSize: 16, fontWeight: "bold" }}
										onChange={this.setForm}
									/>
									Mandataire
								</label>
								<label className=" offset-sm-2 col-sm-8 offset-md-2 ">
									<input
										type="radio"
										name="form_selector"
										value="Service"
										style={{ fontSize: 16, fontWeight: "bold" }}
										onChange={this.setForm}
									/>
									Service
								</label>
								<label className=" offset-sm-2 col-sm-8 offset-md-2 ">
									<input
										type="radio"
										name="form_selector"
										value="ti"
										style={{ fontSize: 16, fontWeight: "bold" }}
										onChange={this.setForm}
									/>
									Tribunal d'instance
								</label>
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
