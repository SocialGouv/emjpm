@inscription
Feature: Inscription
  In order use EMJJM
  As a visitor
  I want to sign up

  Background: Navigate to HomePage
    Given a web browser is on EMJJM
    And I see "Inscription"
    And I click on "Inscription"

  Scenario: Manu Individuel at Arras
    When I click on "Hauts-de-France"
    And I click on "ti arras"
    And I click on "Individuel"
    Then I see "Renseignez ci-dessous vos informations professionnelles:"

    When I fill in the following
      | Adresse email                      | manu@email.com        |
      | Mot de passe                       | JaimeLesFrites        |
      | Répétez le mot de passe            | JaimeLesFrites        |
      | Nom                                | Spontex               |
      | Prénom                             | Manu                  |
      | Genre                              | M                     |
      | Téléphone                          | 0123456789            |
      | Téléphone Portable                 | 9876543210            |
      | Adresse (rue)                      | 27, Rue Benoît Voisin |
      | Code Postal                        | 89100                 |
      | Commune                            | Sens                  |
      | Nombre total de mesures souhaitées | 10                    |

    And I click on "Créer mon compte"
    Then I should redirected to "/inscription-done" page
