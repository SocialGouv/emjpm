import { menuBuilder } from "../EnqueteCommon";

export function buildMenuSections(enqueteReponse) {
  const status = enqueteReponse.enquete_reponse_status;
  console.log("status", status);
  const menu = [];

  return menuBuilder.fixMenuStatus(menu);
}
