import React from "react";
import Link from "next/link";

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
            href="mailto:support.emjpm@fabrique.social.gouv.fr"
          >
            Nous contacter{" "}
          </a>
        </li>
        <li>Site optimisé pour Mozilla Firefox et Google Chrome</li>
        <li>
          <Link href="/mentions-legales-modalites-utilisation">
            <a className="button button_transparent" style={{ fontSize: "1em" }}>
              {`Mentions légales et conditions générales d'utilisation`}
            </a>
          </Link>
        </li>
      </ul>
      <ul className="footer__links"> </ul>
    </div>
  </footer>
);

export default Footer;
