import React, { Fragment, useState } from "react";
import { SvgLoader, SvgProxy } from "react-svgmt";

import Map from "./MapSvg";
import { Panel } from "./Panel";

const France = props => {
  const { color, aboveColor, belowColor, departements } = props;
  const [currentPanel, togglePanel] = useState(false);
  return (
    <Fragment>
      {currentPanel.isActive && <Panel togglePanel={togglePanel} currentPanel={currentPanel} />}
      <SvgLoader svgXML={Map}>
        <SvgProxy selector="#carte" fill={color} />
        {departements.map((dpt, index) => (
          <SvgProxy
            key={`${dpt}-${index}`}
            onClick={() => togglePanel({ isActive: true, ...dpt })}
            selector={`#dpt-${dpt.department.code}`}
            fill={dpt.isAbove ? aboveColor : belowColor}
          />
        ))}
      </SvgLoader>
    </Fragment>
  );
};

France.propTypes = {};

France.defaultProps = {
  aboveColor: "#FF6966",
  belowColor: "#70D54F",
  color: "#f6f6f9",
  departements: []
};
export default France;
