UPDATE mandataires man SET liste_blanche_id = (
    SELECT id
    FROM liste_blanche
    WHERE man.lb_user_id = lb_user_id
);
