import Navigation from "../src/components/communComponents/Navigation";
import Footer from "../src/components/communComponents/Footer";
import Form from "../src/components/inscription/Form";

const Inscription = () => (
	<div style={{ display: "block", backgroundColor: "#cad4de", minHeight: "100%" }}>
		<div style={{ minHeight: "90%" }}>
			<Navigation />
			<Form />
		</div>
		<Footer style={{ minHeight: "10%" }} />
	</div>
);
export default Inscription;
