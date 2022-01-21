UPDATE mandataire_prepose_etablissement mid SET liste_blanche_id = (
    SELECT id
    FROM liste_blanche
    WHERE lb_user_id = mid.lb_user_id
);
