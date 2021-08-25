import useUser from "~/hooks/useUser";
import MandataireOcmiMesureImportSwitcher from "./MandataireOcmiMesureImportSwitcher";

function MandataireOcmiMesureImport() {
  const user = useUser();
  const mandataireId = user.mandataire.id;
  const syncEnableOrigin = user.mandataire.sync_ocmi_enable || null;
  return (
    <MandataireOcmiMesureImportSwitcher
      syncEnableOrigin={syncEnableOrigin}
      mandataireId={mandataireId}
    />
  );
}

export { MandataireOcmiMesureImport };
