import { Link } from "~/containers/Commons";
import { Card } from "~/components";

const MapError = () => (
  <Card mt={2} mr={2}>
    Votre adresse est invalide, veuillez la renseigner
    <Link to="/mandataires/edit-informations">ici</Link>.
  </Card>
);

export { MapError };
