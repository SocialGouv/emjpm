import { Popup } from "react-mapbox-gl";

const MapPopup = (props) => {
  const { children, longitude, latitude } = props;
  return (
    <div>
      <Popup
        coordinates={[longitude, latitude]}
        offset={{
          bottom: [0, -28],
          "bottom-left": [12, -38],
          "bottom-right": [-12, -38],
        }}
      >
        {children}
      </Popup>
    </div>
  );
};

export { MapPopup };
