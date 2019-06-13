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
          <a
            className="button button_transparent"
            style={{ fontSize: "1em" }}
            href="mailto:contact@emjpm.beta.gouv.fr"
          >
            Nous contacter{" "}
          </a>
        </li>
        <li>
          <p>Site optimisé pour Mozilla Firefox et Google Chrome</p>
        </li>
      </ul>
      <ul className="footer__links"> </ul>
    </div>
  </footer>
);

export default Footer;
