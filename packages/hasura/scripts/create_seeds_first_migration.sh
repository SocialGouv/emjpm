hasura seeds create roles_seed --from-table role
hasura seeds create regions_seed --from-table regions
hasura seeds create departements_seed --from-table departements
hasura seeds create tribunaux_seed --from-table tis

hasura seeds create services_seed --from-table services
hasura seeds create service_antenne_seed --from-table service_antenne

hasura seeds create lb_users_seed --from-table lb_users
hasura seeds create lb_departements_seed --from-table lb_departements

hasura seeds create users_seed --from-table users
hasura seeds create user_role_seed --from-table user_role
hasura seeds create direction_seed --from-table direction
hasura seeds create magistrat_seed --from-table magistrat
hasura seeds create mandataires_seed --from-table mandataires
hasura seeds create service_members_seed --from-table service_members

hasura seeds create mesures_seed --from-table mesures

hasura migrate create "init" --from-server
