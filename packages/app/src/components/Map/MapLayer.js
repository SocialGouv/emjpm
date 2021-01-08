import { Feature, Layer } from "react-mapbox-gl";

const MapLayer = (props) => {
  const { items, type, image, onMarkerClick } = props;
  return (
    <Layer
      onMouseEnter={(e) => {
        e.target.getCanvas().style.cursor = "pointer";
      }}
      onMouseLeave={(e) => {
        e.target.getCanvas().style.cursor = "grab";
      }}
      type="symbol"
      id={type}
      images={image}
      layout={{ "icon-image": type }}
    >
      {items.map((item) => {
        const { id, longitude, latitude } = item;
        return (
          <Feature
            onClick={() => {
              if (onMarkerClick !== undefined) {
                onMarkerClick({ id, latitude, longitude, type });
              }
            }}
            key={id}
            coordinates={[longitude, latitude]}
          />
        );
      })}
    </Layer>
  );
};

export { MapLayer };
