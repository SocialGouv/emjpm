import "../../../static/css/custom.css";

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
const TableRowMesure = ({ mesure }) => {
  const { ville, type, nom, disponibilite, contact, codepostal, dispo_max } = mesure.properties;
  return (
    <tr style={{ cursor: "pointer" }}>
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
        <b>{nom || contact}</b>
        <br /> <div style={{ color: "#cccccc" }}>{type.toUpperCase()} </div>
      </td>
      <Cell>
        <b>
          {codepostal} - {ville.toUpperCase()}{" "}
        </b>
      </Cell>

      {/*<Cell>{cleanTels(tel).map(t => <Phone key={t} num={t} />)}</Cell>*/}
      {/*<Cell style={{ width: "10% !important" }} title="Voir les détails du mandataire">*/}
      {/*<FaSearch onClick={onClick} style={{ cursor: "pointer" }} />*/}
      {/*</Cell>*/}
    </tr>
  );
};

export default TableRowMesure;
