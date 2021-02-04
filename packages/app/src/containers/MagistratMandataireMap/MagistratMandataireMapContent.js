import { MapCluster, MapContainer, MapLayer } from "~/containers/Map";
import { mapImages } from "~/containers/Map/utils";

function MagistratMandataireMapContent(props) {
  const { latitude, longitude, id, discriminator, mesures } = props;
  return (
    <MapContainer latitude={latitude} longitude={longitude}>
      <MapCluster items={mesures} type="MESURE" />
      <MapLayer
        image={mapImages[discriminator]}
        items={[{ id, latitude, longitude }]}
        type={discriminator}
      />
    </MapContainer>
  );
}

export { MagistratMandataireMapContent };
