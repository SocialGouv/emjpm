import React from "react";
import { Phone, Smartphone, Mail, Home, Info } from "react-feather";

const iconStyle = { width: 22, height: 22, marginRight: 10 };

// fiche recap
const FicheMandataire = ({
  email = "",
  contact_email = "",
  telephone = "",
  telephone_portable = "",
  adresse = "",
  code_postal = "",
  ville = "",
  zip = "",
  dispo_max = 0,
  secretariat = false,
  mesures_en_cours = 0,
  nb_secretariat = 0,
  type = "",
  information = ""
}) => {
  const hasAdresse = adresse || code_postal || ville;
  return (
    <div>
      {type === "service" ? (
        <div style={{ lineHeight: "3em" }} data-cy="fiche-manda-email">
          <Mail style={iconStyle} />
          <a href={`mailto:${contact_email}`}>{contact_email || "Non renseigné"}</a>
        </div>
      ) : (
        <div style={{ lineHeight: "3em" }} data-cy="fiche-manda-email">
          <Mail style={iconStyle} />
          <a href={`mailto:${email}`}>{email || "Non renseigné"}</a>
        </div>
      )}
      <div style={{ lineHeight: "3em" }} data-cy="fiche-manda-telephone">
        <Phone style={iconStyle} />
        {telephone || "Non renseigné"}
      </div>
      {type !== "service" ? (
        <div style={{ lineHeight: "3em" }} data-cy="fiche-manda-telephone-portable">
          <Smartphone style={iconStyle} />
          {telephone_portable || "Non renseigné"}
        </div>
      ) : null}
      <div style={{ lineHeight: "3em" }} data-cy="fiche-manda-adresse">
        <Home style={iconStyle} />
        {hasAdresse ? ` ${adresse} ${code_postal} ${ville}` : "Non renseigné"}
      </div>
      <div style={{ lineHeight: "3em" }} data-cy="fiche-manda-telephone-portable">
        <Info style={iconStyle} />
        {zip || "Non renseigné"}
      </div>
      <br />
      <table style={{ width: 350 }} cellPadding={5}>
        <tbody style={{ fontSize: "1.1em" }}>
          <tr>
            <td style={{ borderRight: "1px solid silver", borderBottom: "1px solid silver" }}>
              {type === "service" ? (
                `Nombre de mesures en cours / Nombre total de mesures souhaitées`
              ) : (
                <b>Nombre total de mesures souhaitées</b>
              )}
            </td>
            <td
              data-cy="fiche-manda-dispo-max"
              style={{ textAlign: "center", borderBottom: "1px solid silver", width: 80 }}
            >
              {type === "service"
                ? `${mesures_en_cours || `-`} / ${dispo_max || `-`}`
                : dispo_max || "-"}
            </td>
          </tr>
          {type !== "service" && (
            <tr>
              <td style={{ borderRight: "1px solid silver" }}>
                <b>Secrétariat</b>
              </td>
              <td style={{ textAlign: "center" }} data-cy="fiche-manda-secretariat">
                {secretariat === true
                  ? `Oui ${nb_secretariat && `(${nb_secretariat} ETP)`}`
                  : "Non"}
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <br />
    </div>
  );
};

export default FicheMandataire;
