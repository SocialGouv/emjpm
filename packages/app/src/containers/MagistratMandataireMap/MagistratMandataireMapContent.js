import { MapCluster, MapContainer, MapLayer } from "~/containers/Map";
import { mapImages } from "~/containers/Map/utils";

function MagistratMandataireMapContent(props) {
  const { latitude, longitude, id, user_type, mesures } = props;
  return (
    <MapContainer latitude={latitude} longitude={longitude}>
      <MapCluster items={mesures} type="MESURE" />
      <MapLayer
        image={mapImages[user_type]}
        items={[{ id, latitude, longitude }]}
      />
    </MapContainer>
  );
}

export { MagistratMandataireMapContent };
