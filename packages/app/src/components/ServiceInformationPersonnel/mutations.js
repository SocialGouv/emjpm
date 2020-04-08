import gql from "graphql-tag";

export const UPDATE_SERVICE_PERSONNEL = gql`
  mutation UpdateServicePersonnel(
    $service_id: Int!
    $nombre_postes_delegues_etp: Float!
    $nombre_delegues: Int!
    $nombre_poste_autre_personnel_etp: Float!
    $nombre_delegues_cnc: Int!
    $nombre_delegues_cnc_pjm: Int!
    $nombre_delegues_cnc_maj: Int!
    $nombre_delegues_cnc_dpf: Int!
    $nombre_delegues_en_formation: Int!
    $nombre_delegues_non_formes: Int!
  ) {
    update_service_personnels(
      _set: {
        nombre_postes_delegues_etp: $nombre_postes_delegues_etp
        nombre_delegues: $nombre_delegues
        nombre_poste_autre_personnel_etp: $nombre_poste_autre_personnel_etp
        nombre_delegues_cnc: $nombre_delegues_cnc
        nombre_delegues_cnc_pjm: $nombre_delegues_cnc_pjm
        nombre_delegues_cnc_maj: $nombre_delegues_cnc_maj
        nombre_delegues_cnc_dpf: $nombre_delegues_cnc_dpf
        nombre_delegues_en_formation: $nombre_delegues_en_formation
        nombre_delegues_non_formes: $nombre_delegues_non_formes
      }
      where: { service_id: { _eq: $service_id } }
    ) {
      returning {
        id
        nombre_postes_delegues_etp
        nombre_delegues
        nombre_poste_autre_personnel_etp
        nombre_delegues_cnc
        nombre_delegues_cnc_pjm
        nombre_delegues_cnc_maj
        nombre_delegues_cnc_dpf
        nombre_delegues_en_formation
        nombre_delegues_non_formes
      }
    }
  }
`;
