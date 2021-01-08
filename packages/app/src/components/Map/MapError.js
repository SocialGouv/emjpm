import { Link } from "~/components/Commons";
import { Card } from "~/ui";

const MapError = () => (
  <Card mt={2} mr={2}>
    Votre adresse est invalide, veuillez la renseigner
    <Link to="/mandataires/edit-informations">ici</Link>.
  </Card>
);

export { MapError };
