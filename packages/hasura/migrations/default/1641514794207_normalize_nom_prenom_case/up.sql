UPDATE services SET nom = UPPER(nom);
UPDATE liste_blanche SET nom = UPPER(nom);
UPDATE "users" SET nom = UPPER(nom);
UPDATE services SET prenom = INITCAP(prenom);
UPDATE liste_blanche SET prenom = INITCAP(prenom);
UPDATE "users" SET prenom = INITCAP(prenom);
