@inscription
Feature: Inscription
  In order use EMJJM
  As a visitor
  I want to sign up

  Background: Navigate to HomePage
    Given a clean test database
    Given a web browser is on EMJJM
    And I click on "Créer votre compte emjpm"

  Scenario: Manu at Arras
    When I click on "Créer votre compte emjpm"
    Then I should redirected to "/signup" page
    Then I see "Création de compte"

    When I click on "#type"
    Then I see "Mandataire individuel"
    And I click on "#react-select-2-option-0"

    Then I fill in the following
      | Email                              | manu@email.com               |
      | Mot de passe                       | JaimeLesFrites123456?        |
      | Confirmation du mot de passe       | JaimeLesFrites123456?        |
      | Nom                                | Spontex                      |
      | Prénom                             | Manu                         |
    And I click on "Suivant"
    Then I see "Création d'un compte de mandataire individuel"
    
    Then I fill in the following
      | SIRET                              | 12345678912345               |
      | Téléphone                       | 0685968574        |
      | Téléphone portable       | 0685968574        |
      | Nombre de mesures souhaité  | 42  |
    When I click on "#tis"
    Then I see "Tribunal d'Instance de Calais"
    And I click on "#react-select-3-option-0"
    
    When I click on "#genre"
    Then I see "Femme"
    And I click on "#react-select-4-option-0"    

    When I click on "#genre"
    Then I see "Femme"
    And I click on "#react-select-4-option-0"    

    When I enter "37 Quai André Citroën" as "#react-select-5-input"
    Then I wait for text "37 Quai André Citroën 75015 Paris"
    And I click on "#react-select-5-option-0"
    Then I click on "Enregistrer" 
    Then I should redirected to "/signup/congratulation" page
    
    When I see "Votre demande d'inscription est terminée"
    And I click on "Se connecter"
    Then I should redirected to "/login" page