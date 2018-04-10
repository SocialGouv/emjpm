import FaSearch from "react-icons/lib/fa/search";
import "../../static/css/custom.css";

// todo: improve tel parsing
const cleanTels = tel => {
  const tel2 = tel.replace(/[.-\s]/g, "");
  if (tel2.length > 10) {
    return [tel2.substring(0, 10), tel2.substring(10, 20), tel2.substring(20)].filter(Boolean);
  }
  return [tel2];
};

const Phone = ({ num }) => {
  return (
    <a href={`tel://${num}`} style={{ display: "block" }} title={`Téléphoner au ${num}`}>
      {num.substring(0, 2)} {num.substring(2, 4)} {num.substring(4, 6)} {num.substring(6, 8)}{" "}
      {num.substring(8, 10)}
    </a>
  );
};

const Cell = ({ style, title, children, value }) => (
  <td
    className={`pagination-centered ${colorMandatairesRetangle(value)}`}
    style={{ fontSize: "0.8em", textAlign: "left", ...style }}
    title={title}
  >
    <style jsx>{`
      td {
        vertical-align: middle !important;
        textalign: "left";
      }
    `}</style>
    {children}
  </td>
);

// const colorMatch =(disponibilite) => {
// if (isponibilite > 5 && disponibilite < 600)
//     if (disponibilite > 5 && disponibilite < 600)
//     '0-19'     : 'red',
//     '20-59'    : 'orange',
//     '60-100'   : 'green'
// };
const colorMandataires = value => {
  if (value && value < 1) {
    return "red";
  } else if (value && value > 5) {
    return "green";
  } else if (value && value < 6 && value > 0) {
    return "orange";
  } else {
    return "gris";
  }
};

const colorMandatairesRetangle = value => {
  if (value && value < 1) {
    return "redrectangle";
  } else if (value && value > 5) {
    return "greenrectangle";
  } else if (value && value < 6 && value > 0) {
    return "orangerectangle";
  }
};
const TableRowMandataire = ({ mandataire, onClick }) => {
  const {
    ville,
    type,
    etablissement,
    disponibilite,
    referent,
    code_postal,
    dispo_max
  } = mandataire;
  return (
    <tr onClick={onClick} style={{ cursor: "pointer" }}>
      <td style={{ width: "100px", verticalAlign: "middle", textAlign: "left" }}>
        <div
          className={`${colorMandataires(dispo_max - disponibilite)}`}
          style={{ lineHeight: "40px", fontSize: "0.7em" }}
        >
          {" "}
          {type.toUpperCase().substr(0, 1)}
        </div>
      </td>

      <td style={{ fontSize: "0.8em", verticalAlign: "middle", textAlign: "left" }}>
        <b>{etablissement || referent}</b>
        <br /> <div style={{ color: "#cccccc" }}>{type.toUpperCase()} </div>
      </td>
      <Cell>
        <b>
          {code_postal} - {ville}{" "}
        </b>
      </Cell>

      <td style={{ fontSize: "0.8em", verticalAlign: "middle" }}>
        <div
          className={`${colorMandatairesRetangle(dispo_max - disponibilite)}`}
          style={{ lineHeight: "40px", borderRadius: "5px" }}
        >
          {" "}
          {disponibilite} / {dispo_max}
        </div>
      </td>
      {/*<Cell>{cleanTels(tel).map(t => <Phone key={t} num={t} />)}</Cell>*/}
      {/*<Cell style={{ width: "10% !important" }} title="Voir les détails du mandataire">*/}
      {/*<FaSearch onClick={onClick} style={{ cursor: "pointer" }} />*/}
      {/*</Cell>*/}
    </tr>
  );
};

export default TableRowMandataire;
