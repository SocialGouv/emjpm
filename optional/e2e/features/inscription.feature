@inscription
Feature: Inscription
  In order use EMJJM
  As a visitor
  I want to sign up

  Background: Navigate to HomePage
    Given a clean test database
    Given a web browser is on EMJJM
    And I see "Créer votre compte emjpm"
    And I click on "Créer votre compte emjpm"

  @inscription_individuel
  Scenario Outline: Manu at Arras
    When I click on "Hauts-de-France"
    And I click on "ti arras"
    And I click on "<type>"
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

    Examples:
      | type       |
      | Individuel |
      | Préposé    |

  @inscription_service
  Scenario: Dan Service at Arras
    When I click on "Hauts-de-France"
    And I click on "ti arras"
    And I click on "Service"
    Then I see "Renseignez ci-dessous vos informations professionnelles:"

    When I fill in the following
      | Adresse email                        | dan@email.com         |
      | Mot de passe                         | JaimeLesFrites        |
      | Répétez le mot de passe              | JaimeLesFrites        |
      | Nom du service                       | Spontex               |
      | Nom du contact dans le service       | Spontex               |
      | Prénom du contact dans le service    | Dan                   |
      | Téléphone du contact dans le service | 0123456789            |
      | Adresse (rue)                        | 27, Rue Benoît Voisin |
      | Code Postal                          | 89100                 |
      | Commune                              | Sens                  |
      | Nombre total de mesures souhaitées   | 10                    |

    And I click on "Créer mon compte"
    Then I should redirected to "/inscription-done" page

  @inscription_tribunal_instance
  Scenario: Frank Tribunal Instance d'Arras
    When I click on "Hauts-de-France"
    And I click on "ti arras"
    And I click on "Tribunal Instance"
    Then I see "Renseignez ci-dessous vos informations professionnelles:"

    When I fill in the following
      | Adresse email           | arras@ti.com   |
      | Mot de passe            | JaimeLesFrites |
      | Répétez le mot de passe | JaimeLesFrites |
      | Nom                     | Spontex        |
      | Prénom                  | Frank          |
      | Cabinet                 | 4A             |

    And I click on "Créer mon compte"
    Then I should redirected to "/inscription-done" page
