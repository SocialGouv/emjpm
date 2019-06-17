import apiFetch from "../communComponents/Api";
import { saveAs } from "file-saver";

const exportCV = mandataire => {
  apiFetch(`/mandataires/${mandataire.id}/cv`, {}, { blob: true }).then(response => {
    saveAs(response, `CV-${mandataire.nom}.${response.type.split("/").pop()}`);
  });
};

export default exportCV;
