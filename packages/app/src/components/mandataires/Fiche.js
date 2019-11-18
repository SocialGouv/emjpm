import React from "react";
import { Home, Info, Mail, Phone, Smartphone } from "react-feather";

const iconStyle = { width: 22, height: 22, marginRight: 10 };

// fiche recap
const FicheMandataire = ({
  email = "",
  telephone = "",
  telephone_portable = "",
  adresse = "",
  code_postal = "",
  ville = "",
  zip = "",
  dispo_max = 0,
  secretariat = false,
  nb_secretariat = 0,
  information = ""
}) => {
  const hasAdresse = adresse || code_postal || ville;
  return (
    <div>
      <div style={{ lineHeight: "3em" }} data-cy="fiche-manda-email">
        <Mail style={iconStyle} />
        <a href={`mailto:${email}`}>{email || "Non renseigné"}</a>
      </div>
      <div style={{ lineHeight: "3em" }} data-cy="fiche-manda-telephone">
        <Phone style={iconStyle} />
        {telephone || "Non renseigné"}
      </div>
      <div style={{ lineHeight: "3em" }} data-cy="fiche-manda-telephone-portable">
        <Smartphone style={iconStyle} />
        {telephone_portable || "Non renseigné"}
      </div>
      <div style={{ lineHeight: "3em" }} data-cy="fiche-manda-adresse">
        <Home style={iconStyle} />
        {hasAdresse ? ` ${adresse} ${code_postal} ${ville}` : "Non renseigné"}
      </div>
      <div style={{ lineHeight: "3em" }} data-cy="fiche-manda-telephone-portable">
        <Info style={iconStyle} />
        {zip || information || "Non renseigné"}
      </div>
      <br />
      <table style={{ width: 350 }} cellPadding={5}>
        <tbody style={{ fontSize: "1.1em" }}>
          <tr>
            <td style={{ borderRight: "1px solid silver", borderBottom: "1px solid silver" }}>
              <b>Nombre total de mesures souhaitées</b>
            </td>
            <td
              data-cy="fiche-manda-dispo-max"
              style={{ textAlign: "center", borderBottom: "1px solid silver", width: 80 }}
            >
              {dispo_max || "-"}
            </td>
          </tr>
          <tr>
            <td style={{ borderRight: "1px solid silver" }}>
              <b>Secrétariat</b>
            </td>
            <td style={{ textAlign: "center" }} data-cy="fiche-manda-secretariat">
              {secretariat === true ? `Oui ${nb_secretariat && `(${nb_secretariat} ETP)`}` : "Non"}
            </td>
          </tr>
        </tbody>
      </table>
      <br />
    </div>
  );
};

export default FicheMandataire;
