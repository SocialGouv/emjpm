import { Card } from "@emjpm/ui";
import React from "react";

import { Link } from "../Commons";

const MapError = () => (
  <Card mt={2} mr={2}>
    Votre adresse est invalide, veuillez la renseigner
    <Link href="/mandataires/edit-informations">ici</Link>.
  </Card>
);

export { MapError };
