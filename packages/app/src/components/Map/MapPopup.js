import React from "react";
import { Popup } from "react-mapbox-gl";

const MapPopup = (props) => {
  const { children, longitude, latitude } = props;
  return (
    <div>
      <Popup
        coordinates={[longitude, latitude]}
        offset={{
          "bottom-left": [12, -38],
          bottom: [0, -28],
          "bottom-right": [-12, -38],
        }}
      >
        {children}
      </Popup>
    </div>
  );
};

export { MapPopup };
