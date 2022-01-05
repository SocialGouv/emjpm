INSERT INTO liste_blanche (
   type,
    email,
    nom,
    prenom,
    siret,
    departement_code,
    code_postal,
    ville,
    adresse,
    adresse_complement,
    telephone,
    telephone_portable,
    genre,
    competences,
    created_at,
    lb_user_id
)
SELECT
    lbu.type,
    lbu.email,
    lbu.nom,
    lbu.prenom,
    lbu.siret,
    man.departement_code,
    lbu.code_postal,
    lbu.ville,
    lbu.adresse1,
    lbu.adresse2,
    man.telephone,
    man.telephone_portable,
    man.genre,
    man.competences,
    lbu.created_at,
    lbu.id
FROM lb_users lbu
LEFT JOIN mandataires man ON lbu.id = man.lb_user_id;
