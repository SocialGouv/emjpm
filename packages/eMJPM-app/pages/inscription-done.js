import Navigation from "../src/components/communComponents/Navigation";
import Footer from "../src/components/communComponents/Footer";

const Inscription = () => (
  <div style={{ display: "block", backgroundColor: "#cad4de" }}>
    <Navigation />

    <div style={{ textAlign: "center", fontSize: "1.3em", marginTop: 100 }}>
      <p>Merci ! Votre demande a bien été prise en compte.</p>
      <p>Notre équipe a été informée et vous recevrez une confirmation très prochainement.</p>
    </div>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <p>&nbsp;</p>

    <Footer />
  </div>
);
export default Inscription;
