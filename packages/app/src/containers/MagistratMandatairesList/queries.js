import gql from "graphql-tag";

export const MANDATAIRE_COMMENTS = gql`
  query MandataireComments($service_id: Int, $mandataire_id: Int) {
    commentaires(
      where: {
        service_id: { _eq: $service_id }
        mandataire_id: { _eq: $mandataire_id }
      }
    ) {
      comment
      service_id
      created_at
      id
      mandataire_id
      ti_id
    }
  }
`;

export const SERVICE_ANTENNES = gql`
  query ServiceAntennes($serviceId: Int) {
    service_antenne(where: { service_id: { _eq: $serviceId } }) {
      contact_email
      contact_firstname
      contact_lastname
      contact_phone
      mesures_awaiting
      mesures_max
      mesures_in_progress
      name
      id
      code_postal
      adresse
      ville
    }
  }
`;

export const GET_MANDATAIRES = gql`
  query search_ti_view_lb_tis(
    $tribunal: Int!
    $offset: Int!
    $user_type: String
    $orderBy: [view_lb_tis_order_by!]
    $limit: Int
    $searchText: String
    $departementCode: String
    $habilitation: Boolean
    $prefer: Boolean
    $available: Boolean
    $departementFilter: String
  ) {
    count: search_ti_view_lb_tis_aggregate(
      args: {
        search: $searchText
        departementcode: $departementCode
        tiid: $tribunal
      }
      where: {
        user_type: { _eq: $user_type }
        habilitation: { _eq: $habilitation }
        prefer: { _eq: $prefer }
        available: { _eq: $available }
        _or: [
          {
            gestionnaire: {
              service: {
                service_departements: {
                  departement_code: { _eq: $departementFilter }
                }
              }
            }
          }
          {
            gestionnaire: {
              mandataire: {
                liste_blanche: {
                  mandataire_individuel_departements: {
                    departement_code: { _eq: $departementFilter }
                  }
                }
              }
            }
          }
          {
            gestionnaire: {
              mandataire: {
                liste_blanche: {
                  mandataire_prepose_etablissements: {
                    etablissement: {
                      departement_code: { _eq: $departementFilter }
                    }
                  }
                }
              }
            }
          }
        ]
      }
    ) {
      aggregate {
        count
      }
    }
    mandatairesList: search_ti_view_lb_tis(
      limit: $limit
      offset: $offset
      order_by: $orderBy
      args: {
        search: $searchText
        departementcode: $departementCode
        tiid: $tribunal
      }
      where: {
        user_type: { _eq: $user_type }
        habilitation: { _eq: $habilitation }
        prefer: { _eq: $prefer }
        available: { _eq: $available }
        _or: [
          {
            gestionnaire: {
              service: {
                service_departements: {
                  departement_code: { _eq: $departementFilter }
                }
              }
            }
          }
          {
            gestionnaire: {
              mandataire: {
                liste_blanche: {
                  mandataire_individuel_departements: {
                    departement_code: { _eq: $departementFilter }
                  }
                }
              }
            }
          }
          {
            gestionnaire: {
              mandataire: {
                liste_blanche: {
                  mandataire_prepose_etablissements: {
                    etablissement: {
                      departement_code: { _eq: $departementFilter }
                    }
                  }
                }
              }
            }
          }
        ]
      }
    ) {
      prefer
      habilitation
      available
      user_type
      remaining_capacity
      gestionnaires(distinct_on: [id]) {
        id
        discriminator
        mesures_awaiting
        mesures_in_progress
        mesures_max
        mesures_last_update
        mandataire_id
        remaining_capacity
        service_id
        mandataire {
          telephone
          code_postal
          ville
          adresse
          commentaires {
            id
            comment
            ti_id
          }
          user {
            id
            nom
            prenom
            email
            genre
            last_login
          }
          id
          suspend_activity
        }
        gestionnaire_tis {
          tis {
            id
            etablissement
          }
        }
        service {
          id
          nom
          prenom
          adresse
          code_postal
          ville
          telephone
          email
          etablissement
          suspend_activity
          service_members {
            id
            user {
              id
              last_login
            }
          }
          service_antennes_aggregate(
            where: { departement_code: { _eq: $departementFilter } }
          ) {
            aggregate {
              count
              sum {
                mesures_max
                mesures_awaiting: mesures_awaiting_cached
                mesures_in_progress: mesures_in_progress_cached
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_MANDATAIRES_BY_COORDS = gql`
  query locate_ti_view_lb_tis(
    $offset: Int!
    $user_type: String
    $orderBy: [view_lb_tis_order_by!]
    $limit: Int
    $habilitation: Boolean
    $prefer: Boolean
    $available: Boolean
    $lat: float8!
    $lon: float8!
    $distanceMaxKM: float8
    $departementFilter: String
  ) {
    count: locate_ti_view_lb_tis_aggregate(
      args: { lat: $lat, lon: $lon }
      where: {
        user_type: { _eq: $user_type }
        habilitation: { _eq: $habilitation }
        prefer: { _eq: $prefer }
        available: { _eq: $available }
        distance: { _lte: $distanceMaxKM }
        _or: [
          {
            gestionnaire: {
              service: {
                service_departements: {
                  departement_code: { _eq: $departementFilter }
                }
              }
            }
          }
          {
            gestionnaire: {
              mandataire: {
                liste_blanche: {
                  mandataire_individuel_departements: {
                    departement_code: { _eq: $departementFilter }
                  }
                }
              }
            }
          }
          {
            gestionnaire: {
              mandataire: {
                liste_blanche: {
                  mandataire_prepose_etablissements: {
                    etablissement: {
                      departement_code: { _eq: $departementFilter }
                    }
                  }
                }
              }
            }
          }
        ]
      }
    ) {
      aggregate {
        count
      }
    }
    mandatairesList: locate_ti_view_lb_tis(
      limit: $limit
      offset: $offset
      order_by: $orderBy
      args: { lat: $lat, lon: $lon }
      where: {
        user_type: { _eq: $user_type }
        habilitation: { _eq: $habilitation }
        prefer: { _eq: $prefer }
        available: { _eq: $available }
        distance: { _lte: $distanceMaxKM }
        _or: [
          {
            gestionnaire: {
              service: {
                service_departements: {
                  departement_code: { _eq: $departementFilter }
                }
              }
            }
          }
          {
            gestionnaire: {
              mandataire: {
                liste_blanche: {
                  mandataire_individuel_departements: {
                    departement_code: { _eq: $departementFilter }
                  }
                }
              }
            }
          }
          {
            gestionnaire: {
              mandataire: {
                liste_blanche: {
                  mandataire_prepose_etablissements: {
                    etablissement: {
                      departement_code: { _eq: $departementFilter }
                    }
                  }
                }
              }
            }
          }
        ]
      }
    ) {
      distance
      prefer
      habilitation
      available
      user_type
      gestionnaires(distinct_on: [id]) {
        id
        discriminator
        mesures_awaiting
        mesures_in_progress
        mesures_max
        mesures_last_update
        mandataire_id
        remaining_capacity
        service_id
        mandataire {
          telephone
          adresse
          suspend_activity
          commentaires {
            id
            comment
            ti_id
          }
          user {
            id
            nom
            prenom
            email
            genre
            last_login
          }
          id
        }
        gestionnaire_tis {
          tis {
            id
            etablissement
          }
        }
        service {
          id
          nom
          prenom
          ville
          adresse
          code_postal
          telephone
          email
          etablissement
          suspend_activity
          service_members {
            id
            user {
              id
              last_login
            }
          }
          service_antennes_aggregate {
            aggregate {
              count
              sum {
                mesures_max
                mesures_awaiting: mesures_awaiting_cached
                mesures_in_progress: mesures_in_progress_cached
              }
            }
          }
        }
      }
    }
  }
`;
