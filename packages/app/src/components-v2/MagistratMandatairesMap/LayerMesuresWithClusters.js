import React from "react";
import { Cluster, Marker } from "react-mapbox-gl";

import iconMarker from "../../../static/images/map-icon-mesure@2x.png";
import iconEmpty from "../../../static/images/map-icon-empty@2x.png";

const styles = {
  clusterMarker: {
    width: 30,
    height: 36,
    backgroundImage: `url(${iconEmpty})`,
    backgroundSize: "30px 36px",
    color: "white",
    fontSize: "16px",
    textAlign: "center",
    lineHeight: "30px",
    fontWeight: "bold"
  },
  marker: {
    width: 30,
    height: 36,
    backgroundImage: `url(${iconMarker})`,
    backgroundSize: "30px 36px"
  }
};

const ClusterMarker = (coordinates, pointCount) => {
  return (
    <Marker key={coordinates.toString()} coordinates={coordinates} style={styles.clusterMarker}>
      <div>{pointCount}</div>
    </Marker>
  );
};

// This version use cluster with marker (this is not a very good thing since markers use a lot of memory)
const LayerMesures = props => {
  const { mesures } = props;
  return (
    <Cluster ClusterMarkerFactory={ClusterMarker}>
      {mesures.map(mesure => {
        return (
          <Marker
            key={mesure.id}
            style={styles.marker}
            coordinates={[
              2.333333 - Math.random() + Math.random(),
              48.866667 + Math.random() - Math.random()
            ]}
            data-feature={mesure}
          />
        );
      })}
    </Cluster>
  );
};

export default LayerMesures;
