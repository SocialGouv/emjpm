import useUser from "~/hooks/useUser";

const syncOcmiDisabledMessage =
  "La synchronisation de vos mesures avec OCMI est activée, désactivez la synchronisation pour pouvoir modifier vos mesures.";

const syncEditorDisabledMessage = (editorName) => {
  return `La synchronisation de vos mesures avec votre éditeur est activée. Modifiez vos mesures sur le logiciel de votre éditeur "${editorName}"`;
};

export default function useMesuresLocked(mesure) {
  const user = useUser();

  const isService = !!user.service;
  let locked;
  let lockedByEditor;
  let editorName;
  if (isService) {
    lockedByEditor = mesure
      ? !!mesure.editor_id
      : user.service?.editor_locked_mesures;
    locked = lockedByEditor || user.service?.sync_ocmi_enable;
    editorName = user.service?.editor?.name;
  } else {
    lockedByEditor = mesure
      ? !!mesure.editor_id
      : user.mandataire?.editor_locked_mesures;
    locked = lockedByEditor || user.mandataire?.sync_ocmi_enable;
    editorName = user.mandataire?.editor?.name;
  }

  const message = lockedByEditor
    ? syncEditorDisabledMessage(editorName)
    : syncOcmiDisabledMessage;

  return { locked, lockedByEditor, message };
}
