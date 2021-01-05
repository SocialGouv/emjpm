# Demande de création d'un compte par un individuel
création d'une entrée dans les tables users et mandataires (`mandataire.siret`)
`mandataire.lb_users_id`=`lb_users.id` WHERE `mandataire.siret`==`lb_users.siret`
`mandataire.siret` (utilisé uniquement pour l'association)
`user.email`
`lb_users.email`

# Demande de création d'un compte par un prepose
création d'une entrée dans les tables users et mandataires (`user.email`)
`mandataire.lb_users_id`=`lb_users.id` WHERE `user.email`==`lb_users.email`
`user.email` (modifiable par l'utilisateur, priorité sur `lb_users.email`) (TODO: rely on instead of lb_user if associated user exists)
`lb_users.email` (modifiable que par l'admin ou les agents d'État)
