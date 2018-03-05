import FaSearch from "react-icons/lib/fa/search";

const cleanTels = tel => {
  const tel2 = tel.replace(/[\.-\s]/g, "");
  if (tel2.length > 10) {
    return [tel2.substring(0, 10), tel2.substring(10, 20), tel2.substring(20)].filter(Boolean);
  }
  return [tel2];
};

const Phone = ({ num }) => {
  return (
    <a href={`tel://${num}`} style={{ display: "block" }}>
      {num.substring(0, 2)} {num.substring(2, 4)} {num.substring(4, 6)} {num.substring(6, 8)}{" "}
      {num.substring(8, 10)}
    </a>
  );
};

const TableRowMandataire = ({ mandataire, onClick }) => {
  const { ville, type, nom, disponibilite, tel } = mandataire.properties;
  return (
    <tr>
      <td className="pagination-centered" style={{ fontSize: "0.8em" }}>
        {type.toUpperCase()}
      </td>
      <td className="pagination-centered" style={{ fontSize: "0.8em" }}>
        {ville}
      </td>
      <td className="pagination-centered" style={{ fontSize: "0.8em" }}>
        {nom}
      </td>
      <td className="pagination-centered" style={{ fontSize: "0.8em" }}>
        {disponibilite}
      </td>
      <td className="pagination-centered" style={{ fontSize: "0.8em" }}>
        {cleanTels(tel).map(t => <Phone key={t} num={t} />)}
      </td>
      <td style={{ width: "10% !important" }} title="Voir les détails du mandataire">
        <FaSearch onClick={onClick} style={{ cursor: "pointer" }} />
      </td>
    </tr>
  );
};

export default TableRowMandataire;
