import { Card } from "@emjpm/ui";
import Link from "next/link";
import React from "react";

const MapError = () => (
  <Card mt={2} mr={2}>
    Votre adresse est invalide, veuillez la renseigner
    <Link href="/mandataires/edit-informations">
      <a> ici</a>
    </Link>
    .
  </Card>
);

export { MapError };
