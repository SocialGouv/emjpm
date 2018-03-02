const TableRowMandataire = ({ mandataire, onClick }) => {
  const { ville, type, nom, disponibilite, tel } = mandataire.properties;
  return (
    <tr>
      <td className="pagination-centered" style={{ fontSize: "0.8em" }}>
        {type}
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
        {tel}
      </td>
      <td style={{ width: "10% !important" }}>
        {/*<button*/}
        {/*className="btn btn-secondary btn-sm"*/}
        {/*onClick={onClick}*/}
        {/*>*/}
        {/*<Icon glyph="star"  />*/}
        {/*<FontAwesome name="fa-search"/>*/}
        {/*</button>*/}
      </td>
    </tr>
  );
};

export default TableRowMandataire;
