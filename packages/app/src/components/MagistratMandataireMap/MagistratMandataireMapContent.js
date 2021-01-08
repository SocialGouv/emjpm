import { MapCluster, MapContainer, MapLayer } from "~/components/Map";
import { mapImages } from "~/components/Map/utils";

const MagistratMandataireMapContent = (props) => {
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
};

export { MagistratMandataireMapContent };
