import React from "react";
import { Cluster, Marker } from "react-mapbox-gl";

const styles = {
  marker: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    backgroundColor: "#51D5A0",
    border: "2px solid #56C498",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white"
  },
  clickable: {
    cursor: "pointer"
  },
  selected: {
    fontWeight: "bold",
    backgroundColor: "rgb(213, 112, 81)",
    border: "2px solid rgb(196, 86, 86)"
  }
};

const MapCluster = props => {
  const { items, type, onMarkerClick, onClusterClick } = props;

  const clusterMarker = (coordinates, pointCount, getLeaves) => {
    const isSelected = getLeaves().some(x => x.props.className === "selected");

    return (
      <Marker
        key={coordinates.toString()}
        coordinates={coordinates}
        style={{
          ...styles.marker,
          ...(isSelected ? styles.selected : {}),
          ...(onClusterClick ? styles.clickable : {})
        }}
        onClick={() => {
          if (onMarkerClick !== undefined) {
            const markers = getLeaves().map(x => ({
              id: parseInt(x.key),
              type,
              longitude: x.props.coordinates[0],
              latitude: x.props.coordinates[1]
            }));
            onClusterClick(markers);
          }
        }}
      >
        <div>{pointCount}</div>
      </Marker>
    );
  };

  return (
    <Cluster ClusterMarkerFactory={clusterMarker}>
      {items.map(({ id, isSelected, longitude, latitude }) => (
        <Marker
          className={isSelected ? "selected" : null}
          style={{
            ...styles.marker,
            ...(isSelected ? styles.selected : {}),
            ...(onMarkerClick ? styles.clickable : {})
          }}
          coordinates={[longitude, latitude]}
          onClick={() => {
            if (onMarkerClick !== undefined) {
              onMarkerClick({ id, type, longitude, latitude });
            }
          }}
          key={id} // do not modify the key: this id will be passed to onClusterClick
        >
          <div>{1}</div>
        </Marker>
      ))}
    </Cluster>
  );
};

export { MapCluster };
