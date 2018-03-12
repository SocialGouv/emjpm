import FaSearch from "react-icons/lib/fa/search";

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

const Cell = ({ style, title, children }) => (
  <td className="pagination-centered" style={{ fontSize: "0.8em", ...style }} title={title}>
    <style jsx>{`
      td {
        vertical-align: middle !important;
      }
    `}</style>
    {children}
  </td>
);

const TableRowMandataire = ({ mandataire, onClick }) => {
  const { ville, type, nom, disponibilite, tel, contact } = mandataire.properties;
  return (
    <tr>
      <Cell style={{textAlign: "left"}}>{type.toUpperCase()}</Cell>
      <Cell style={{textAlign: "left"}}>{ville}</Cell>
      <Cell style={{textAlign: "left"}}>{nom || contact}</Cell>
      <Cell>{disponibilite}</Cell>
      {/*<Cell>{cleanTels(tel).map(t => <Phone key={t} num={t} />)}</Cell>*/}
      <Cell style={{ width: "10% !important" }} title="Voir les détails du mandataire">
        <FaSearch onClick={onClick} style={{ cursor: "pointer" }} />
      </Cell>
    </tr>
  );
};

export default TableRowMandataire;
