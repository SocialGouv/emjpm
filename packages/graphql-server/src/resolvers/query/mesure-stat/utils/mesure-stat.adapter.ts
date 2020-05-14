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
          "MAJ",
          "mandat de protection future",
          "Mesure ad hoc",
          "Subrogé curateur",
          "Subrogé tuteur"
        ];
      case MesureTypeCategory.SauvegardeJustice:
        return [
          "Sauvegarde de justice",
          "Sauvegarde de justice avec mandat spécial"
        ];
      case MesureTypeCategory.Tutelle:
        return [
          "Tutelle",
          "Tutelle aux biens",
          "Tutelle aux biens et à la personne",
          "Tutelle à la personne"
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
      case "MAJ":
      case "mandat de protection future":
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
