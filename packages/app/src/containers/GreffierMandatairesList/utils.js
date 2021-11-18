import { formatMandataire } from "~/formatters/mandataires";

export function formatMandatairesList(mandatairesList) {
  return mandatairesList.map((row) => formatMandataire(row.gestionnaire));
}
