import gql from "graphql-tag";

export const ENQUETE_PREPOSE_PERSONEL_FORMATION = gql`
  query enquete_prepose_personel_formation($id: Int!) {
    enquete_reponses_prepose_personel_formation_by_pk(id: $id) {
      nb_preposes_mjpm
      nb_preposes_mjpm_etp
      formation_preposes_mjpm
      niveaux_qualification
      nb_preposes_homme
      nb_preposes_femme
      nb_autre_personnel
      nb_autre_personnel_etp
    }
  }
`;
