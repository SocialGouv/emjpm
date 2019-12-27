import Router from "next/router";
import React from "react";
import { Feature, Layer } from "react-mapbox-gl";

const LayerMandataires = props => {
  const { gestionnaires, discriminator, images } = props;
  return (
    <Layer
      onMouseEnter={e => {
        e.target.getCanvas().style.cursor = "pointer";
      }}
      onMouseLeave={e => {
        e.target.getCanvas().style.cursor = "grab";
      }}
      type="symbol"
      id={discriminator}
      images={images}
      layout={{ "icon-image": discriminator }}
    >
      {gestionnaires.map(gestionnaire => {
        const { id, discriminator, longitude, latitude } = gestionnaire;
        return (
          <Feature
            onClick={() =>
              // TODO add a generic click
              Router.push(`/magistrats/gestionnaires/${discriminator.toUpperCase()}-${id}`)
            }
            key={id}
            coordinates={[longitude, latitude]}
          />
        );
      })}
    </Layer>
  );
};

export default LayerMandataires;
