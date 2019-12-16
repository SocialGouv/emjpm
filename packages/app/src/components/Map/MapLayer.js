import React from "react";
import { Feature, Layer } from "react-mapbox-gl";

import iconMarker from "../../../static/images/map-icon-mesure@2x.png";

const image = new Image(60, 72);
image.src = iconMarker;
const images = ["mesure", image, { pixelRatio: 2 }];

const MapLayer = props => {
  const { markers, type, onClick } = props;
  return (
    <Layer
      onMouseEnter={e => {
        e.target.getCanvas().style.cursor = "pointer";
      }}
      onMouseLeave={e => {
        e.target.getCanvas().style.cursor = "grab";
      }}
      type="symbol"
      id={type}
      images={images}
      layout={{ "icon-image": type }}
    >
      {markers.map(marker => {
        const { id, latitude, longitude } = marker;
        return (
          <Feature
            key={id}
            onClick={onClick}
            properties={{
              currentId: id,
              latitude: latitude,
              longitude: longitude
            }}
            coordinates={[longitude, latitude]}
          />
        );
      })}
    </Layer>
  );
};

export { MapLayer };
