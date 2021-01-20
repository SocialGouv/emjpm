import React from "react";

const Marker = React.lazy(() => import("./Lazy/Marker"));
const Cluster = React.lazy(() => import("./Lazy/Cluster"));

const styles = {
  clickable: {
    cursor: "pointer",
  },
  marker: {
    alignItems: "center",
    backgroundColor: "#51D5A0",
    border: "2px solid #56C498",
    borderRadius: "50%",
    color: "white",
    display: "flex",
    height: 30,
    justifyContent: "center",
    width: 30,
  },
  selected: {
    backgroundColor: "rgb(213, 112, 81)",
    border: "2px solid rgb(196, 86, 86)",
    fontWeight: "bold",
  },
};

function MapCluster(props) {
  const { items, type, onMarkerClick, onClusterClick } = props;

  function clusterMarker(coordinates, pointCount, getLeaves) {
    const isSelected = getLeaves().some(
      (x) => x.props.className === "selected"
    );

    return (
      <Marker
        key={coordinates.toString()}
        coordinates={coordinates}
        style={{
          ...styles.marker,
          ...(isSelected ? styles.selected : {}),
          ...(onClusterClick ? styles.clickable : {}),
        }}
        onClick={() => {
          if (onMarkerClick !== undefined) {
            const markers = getLeaves().map((x) => ({
              id: parseInt(x.key),
              latitude: x.props.coordinates[1],
              longitude: x.props.coordinates[0],
              type,
            }));
            onClusterClick(markers);
          }
        }}
      >
        <div>{pointCount}</div>
      </Marker>
    );
  }

  return (
    <Cluster ClusterMarkerFactory={clusterMarker}>
      {items.map(({ id, isSelected, longitude, latitude }) => (
        <Marker
          className={isSelected ? "selected" : null}
          style={{
            ...styles.marker,
            ...(isSelected ? styles.selected : {}),
            ...(onMarkerClick ? styles.clickable : {}),
          }}
          coordinates={[longitude, latitude]}
          onClick={() => {
            if (onMarkerClick !== undefined) {
              onMarkerClick({ id, latitude, longitude, type });
            }
          }}
          key={id} // do not modify the key: this id will be passed to onClusterClick
        >
          <div>{1}</div>
        </Marker>
      ))}
    </Cluster>
  );
}

export { MapCluster };
