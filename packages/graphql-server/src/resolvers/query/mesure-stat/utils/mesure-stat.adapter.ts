import { MesureType } from "../../../../model/mesures.model";
import { MesureTypeCategory } from "../../../../types/resolvers-types";

export const mesureStatAdapter = {
  adaptCategory: (category: MesureTypeCategory) => {
    switch (category) {
      case MesureTypeCategory.CuratelleRenforcee:
        return [
          "curatelle renforcée",
          "Curatelle renforcée",
          "Curatelle renforcée aux biens",
          "Curatelle renforcée aux biens et à la personne",
          "Curatelle renforcée à la personne"
        ];
      case MesureTypeCategory.CuratelleSimple:
        return [
          "Curatelle",
          "Curatelle simple",
          "Curatelle simple aux biens",
          "Curatelle simple à la personne",
          "Curatelle simple aux biens et à la personne"
        ];
      case MesureTypeCategory.Other:
        return [
          "MAJ",
          "Mandat de protection future",
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
