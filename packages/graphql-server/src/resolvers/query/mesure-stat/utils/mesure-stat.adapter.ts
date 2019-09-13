import { MesureType } from "../../../../model/mesures.model";
import { MesureTypeCategory } from "../../../../types/resolvers-types";

export const mesureStatAdapter = {
  adaptType: (type: MesureType) => {
    if (!type) {
      return null;
    }
    switch (type) {
      case "curatelle renforcée":
      case "Curatelle renforcée":
      case "Curatelle renforcée aux biens":
      case "Curatelle renforcée aux biens et à la personne":
      case "Curatelle renforcée à la personne":
        return MesureTypeCategory.CuratelleRenforcee;
      case "Curatelle":
      case "Curatelle simple":
      case "Curatelle simple aux biens":
      case "Curatelle simple à la personne":
      case "Curatelle simple aux biens et à la personne":
        return MesureTypeCategory.CuratelleSimple;
      case "MAJ":
      case "Mandat de protection future":
      case "Mesure ad hoc":
      case "Subrogé curateur":
      case "Subrogé tuteur":
        return MesureTypeCategory.Other;
      case "Sauvegarde de justice":
      case "Sauvegarde de justice avec mandat spécial":
        return MesureTypeCategory.SauvegardeJustice;
      case "Tutelle":
      case "Tutelle aux biens":
      case "Tutelle aux biens et à la personne":
      case "Tutelle à la personne":
        return MesureTypeCategory.Tutelle;
      default:
        throw new Error(
          `[mesureStatAdapter.adaptType] ${type} is not adaptable`
        );
    }
  }
};
