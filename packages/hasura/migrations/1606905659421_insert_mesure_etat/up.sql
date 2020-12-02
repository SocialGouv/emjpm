insert into mesure_etat (mesure_id, date_changement_etat, nature_mesure, champ_mesure, lieu_vie, code_postal, ville, pays)
(SELECT id, date_nomination, nature_mesure, champ_mesure, lieu_vie, code_postal, ville, pays
    FROM mesures WHERE ville is not null 
                  AND nature_mesure is not null
                  AND lieu_vie is not null
                  AND code_postal is not null);
