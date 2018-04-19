const Footer = ({ fixed }) => (
  <footer
    className="footer"
    style={{
      marginTop: 50,
      backgroundColor: "#26353fff",
      width: "100%",
      textAlign: "center",
      ...((fixed && { position: "fixed", bottom: 0 }) || {})
    }}
  >
    <div className="footer_container">
      <div className="footer__logo" />
      <ul className="footer__links">
        <li>
          <h2>emjpm.beta.gouv.fr</h2>
        </li>
        <li>
          <a href="https://www.data.gouv.fr/reference">Données de référence</a>
        </li>
        <li>
          <a href="https://www.data.gouv.fr/terms">Conditions générales d'utilisation</a>
        </li>
      </ul>
      <ul className="footer__links"> </ul>
    </div>
  </footer>
);

export default Footer;
