import { MesureNature } from "../../../../model/mesures.model";
import { MesureNatureCategory } from "../../../../types/resolvers-types";

export const mesureStatAdapter = {
  adaptCategory: (category: MesureNatureCategory) => {
    switch (category) {
      case MesureNatureCategory.CuratelleRenforcee:
        return ["curatelle_renforcee"];
      case MesureNatureCategory.CuratelleSimple:
        return ["curatelle_simple"];
      case MesureNatureCategory.Other:
        return [
          "mandat_protection_future",
          "mesure_accompagnement_judiciaire",
          "mesure_ad_hoc",
          "subroge_curateur",
          "subroge_tuteur",
        ];
      case MesureNatureCategory.SauvegardeJustice:
        return ["sauvegarde_justice"];
      case MesureNatureCategory.Tutelle:
        return ["tutelle"];
    }
  },
  adaptNature: (nature: MesureNature) => {
    if (!nature) {
      return null;
    }
    switch (nature) {
      case "curatelle_renforcee":
        return MesureNatureCategory.CuratelleRenforcee;
      case "curatelle_simple":
        return MesureNatureCategory.CuratelleSimple;
      case "mandat_protection_future":
      case "mesure_accompagnement_judiciaire":
      case "mesure_ad_hoc":
      case "subroge_curateur":
      case "subroge_tuteur":
        return MesureNatureCategory.Other;
      case "sauvegarde_justice":
        return MesureNatureCategory.SauvegardeJustice;
      case "tutelle":
        return MesureNatureCategory.Tutelle;
      default:
        throw new Error(
          `[mesureStatAdapter.adaptNature] ${nature} is not adaptable`
        );
    }
  },
};
