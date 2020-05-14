import { MesureType } from "../../../../model/mesures.model";
import { MesureTypeCategory } from "../../../../types/resolvers-types";

export const mesureStatAdapter = {
  adaptCategory: (category: MesureTypeCategory) => {
    switch (category) {
      case MesureTypeCategory.CuratelleRenforcee:
        return [
          "curatelle renforcée",
          "curatelle renforcée",
          "curatelle renforcée aux biens",
          "curatelle renforcée aux biens et à la personne",
          "curatelle renforcée à la personne"
        ];
      case MesureTypeCategory.CuratelleSimple:
        return [
          "curatelle",
          "curatelle simple",
          "curatelle simple aux biens",
          "curatelle simple à la personne",
          "curatelle simple aux biens et à la personne"
        ];
      case MesureTypeCategory.Other:
        return [
          "maj",
          "mandat de protection future",
          "mesure ad hoc",
          "subrogé curateur",
          "subrogé tuteur"
        ];
      case MesureTypeCategory.SauvegardeJustice:
        return [
          "sauvegarde de justice",
          "sauvegarde de justice avec mandat spécial"
        ];
      case MesureTypeCategory.Tutelle:
        return [
          "tutelle",
          "tutelle aux biens",
          "tutelle aux biens et à la personne",
          "tutelle à la personne"
        ];
    }
  },
  adaptType: (type: MesureType) => {
    if (!type) {
      return null;
    }
    switch (type) {
      case "curatelle renforcée":
      case "curatelle renforcée aux biens":
      case "curatelle renforcée aux biens et à la personne":
      case "curatelle renforcée à la personne":
        return MesureTypeCategory.CuratelleRenforcee;
      case "curatelle":
      case "curatelle simple":
      case "curatelle simple aux biens":
      case "curatelle simple à la personne":
      case "curatelle simple aux biens et à la personne":
        return MesureTypeCategory.CuratelleSimple;
      case "maj":
      case "mandat de protection future":
      case "mesure ad hoc":
      case "subrogé curateur":
      case "subrogé tuteur":
        return MesureTypeCategory.Other;
      case "sauvegarde de justice":
      case "sauvegarde de justice avec mandat spécial":
        return MesureTypeCategory.SauvegardeJustice;
      case "tutelle":
      case "tutelle aux biens":
      case "tutelle aux biens et à la personne":
      case "tutelle à la personne":
        return MesureTypeCategory.Tutelle;
      default:
        throw new Error(
          `[mesureStatAdapter.adaptType] ${type} is not adaptable`
        );
    }
  }
};
