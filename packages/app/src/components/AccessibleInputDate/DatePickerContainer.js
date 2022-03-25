import React from "react";
import { CalendarContainer } from "react-datepicker";

import { SrOnly } from "~/components";

export default function DatePickerContainer({ className, children }) {
  return (
    <div>
      <SrOnly class="message" aria-live="polite" as="div">
        <p>
          Utilisez les flèches de direction gauche et droite pour avancer ou
          reculer d'une journée.
        </p>
        <p>
          Utilisez les flèches de direction haut et bas pour avancer ou reculer
          d'une semaine.
        </p>

        <p>
          Utilisez les tocuhes Page Haut et Page Bas pour avancer ou reculer
          d'un mois.
        </p>
        <p>
          Utilisez les touches Début et Fin pour avancer ou reculer d'une année.
        </p>
        <p>Utilisez la touche Entrée pour sélectionner la date en cours.</p>
        <p>
          Utilisez la touche Échap pour fermer le calendrier sans séléctioner
          une date.
        </p>
      </SrOnly>
      <CalendarContainer className={className}>
        <div style={{ position: "relative" }}>{children}</div>
      </CalendarContainer>
    </div>
  );
}
