const Cell = ({ style, title, children, value }) => (
    <td
        className={`pagination-centered`}
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


export default Cell;