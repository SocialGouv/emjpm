import { useState } from "react";
import { SvgLoader, SvgProxy } from "react-svgmt";

import Map from "./MapSvg";
import { Panel } from "./Panel";
import { SrOnly } from "~/components";

function France(props) {
  const { color, aboveColor, belowColor, departements } = props;
  const [currentPanel, togglePanel] = useState(false);
  return (
    <>
      <SrOnly id="disponibilites_par_territoire">
        Graphique montrant les disponibilités de mandataires par territoire
      </SrOnly>
      {currentPanel.isActive && (
        <Panel togglePanel={togglePanel} currentPanel={currentPanel} />
      )}
      <SvgLoader
        svgXML={Map}
        role="img"
        aria-label="Disponibilités par territoire"
        aria-describedby="disponibilites_par_territoire"
      >
        <SvgProxy selector="#carte" fill={color} />
        {departements.map((dpt, index) => (
          <SvgProxy
            key={`${dpt}-${index}`}
            onClick={() => togglePanel({ isActive: true, ...dpt })}
            selector={`#dpt-${dpt.department.id}`}
            fill={dpt.isAbove ? aboveColor : belowColor}
          />
        ))}
      </SvgLoader>
    </>
  );
}

France.propTypes = {};

France.defaultProps = {
  aboveColor: "#FF6966",
  belowColor: "#70D54F",
  color: "#f6f6f9",
  departements: [],
};
export default France;
