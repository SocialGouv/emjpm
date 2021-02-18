import { Card } from "~/components";
import { Error } from "@styled-icons/material/Error";

function MapFallback() {
  return (
    <Card>
      <div>
        <Error size={22} />
        Impossible d'afficher la carte.
      </div>
      <br />
      <a
        rel="noopener noreferrer"
        target="_blank"
        href="https://www.mozilla.org/fr/firefox/"
      >
        Nous vous conseillons d'utiliser une version récente de Firefox pour
        profiter pleinement des fonctionnalités d'eMJPM.
        <br />
        Veuillez cliquer ici pour installer ou mettre à jour ce navigateur
        libre. 🦊
      </a>
    </Card>
  );
}
export { MapFallback };
