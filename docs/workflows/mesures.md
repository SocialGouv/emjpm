# Mise sous protection d'un majeur (pour la première fois)
`date_premier_mesure` = date du jugement
`date_nomination` = date du jugement
`date_mesure_en_cours` = date du jugement

# Révision d'une mesure de protection (TODO)

## Reconduction
`resultat_revision` = `reconduction`
`date_mesure_en_cours` = date du jugement de la revision

## Aggravation
`resultat_revision` = `aggravation`
`nature_mesure`
`date_mesure_en_cours` = date du jugement de la revision
+ création d'une mesure_etat + mise à jour des données de la mesure

## Allègement
`resultat_revision` = `aggravation`
`nature_mesure`
`date_mesure_en_cours` = date du jugement de la revision
+ création d'une mesure_etat + mise à jour des données de la mesure

## Main levée
`resultat_revision` = `main_levee`
`cause_sortie` = `main_levee`
`date_fin_mesure` = date du jugement de la revision
`date_mesure_en_cours` = null

## Déssaisissement famille
`resultat_revision` = `dessaisissement_famille`
`cause_sortie` = `dessaisissement_famille`
`date_fin_mesure` = date du jugement de la revision
`date_mesure_en_cours` = null

## Déssaisissement autre mandataire
`resultat_revision` = `dessaisissement_autre_mjpm`
`cause_sortie` = `dessaisissement_autre_mjpm`
`date_fin_mesure` = date du jugement de la revision
`date_mesure_en_cours` = null

# Déssaisisement d'un mandataire pour un autre mjpm
création d'une nouvelle mesure + création d'une mesure_etat
`date_premier_mesure` = date du jugement de première mise sous protection (renseigné par l'utilisateur)
`date_nomination` = date du jugement actuel
`date_mesure_en_cours` = date du jugement actuel


# Sortie d'une mesure

## Déssaisissement autre mandataire
voir ci-dessus

## Déssaisissement famille
voir ci-dessus

## Main levée
voir ci-dessus

## Décès
`cause_sortie` = `deces`

## Caducité
expiration (cron job), if `date_previsionnelle` (optionelle) (vérifier la pertinence et ajouter cette donnée)
`cause_sortie` = `caducite`


# Ajout d'une mesure état
si le nouvel état de la mesure est lié à une révision cela implique la mise à jour de la `mesure.date_mesure_en_cours` (= `mesure_etat.date_changement_etat`)
dans le cas contraire un nouvel état n'entrâine que la mise à jour des autres données (si c'est l'état le plus récent, déterminé par la date de la mesure état)