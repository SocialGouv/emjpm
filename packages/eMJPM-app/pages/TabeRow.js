const TabeRow = ({manda, onClick}) => (
    <tr>
        <td className="pagination-centered"
            style={{fontSize: "0.8em"}}>{manda.properties.type}</td>
        <td className="pagination-centered"
            style={{fontSize: "0.8em"}}>{manda.properties.ville}</td>
        <td className="pagination-centered"
            style={{fontSize: "0.8em"}}>{manda.properties.nom}</td>
        <td className="pagination-centered"
            style={{fontSize: "0.8em"}}>{manda.properties.disponibilite}</td>
        <td className="pagination-centered"
            style={{fontSize: "0.8em"}}>{manda.properties.tel}</td>
        <td style={{width: "10% !important"}}>
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
export default TabeRow;
