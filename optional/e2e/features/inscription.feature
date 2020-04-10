@inscription
Feature: Inscription
  In order use EMJPM
  As a visitor
  I want to sign up

  Background: Navigate to HomePage
    Given a clean test database
    Given a web browser is on EMJPM
    And I click on "Créer votre compte emjpm"

  Scenario: Mandataire individuel
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

  Scenario: Mandataire Préposé
    When I click on "Créer votre compte emjpm"
    Then I should redirected to "/signup" page
    Then I see "Création de compte"

    When I click on "#type"
    Then I see "Mandataire préposé d'établissement"
    And I click on "#react-select-2-option-1"

    Then I fill in the following
      | Email                              | manu@email.com               |
      | Mot de passe                       | JaimeLesFrites123456?        |
      | Confirmation du mot de passe       | JaimeLesFrites123456?        |
      | Nom                                | Spontex                      |
      | Prénom                             | Manu                         |
    And I click on "Suivant"
    Then I see "Création d'un compte de mandataire préposé d'établissement"
    
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

  Scenario: Service
    When I click on "Créer votre compte emjpm"
    Then I should redirected to "/signup" page
    Then I see "Création de compte"

    When I click on "#type"
    Then I see "Service mandataire"
    And I click on "#react-select-2-option-2"

    Then I fill in the following
      | Email                              | manu@email.com               |
      | Mot de passe                       | JaimeLesFrites123456?        |
      | Confirmation du mot de passe       | JaimeLesFrites123456?        |
      | Nom                                | Spontex                      |
      | Prénom                             | Manu                         |
    And I click on "Suivant"
    Then I see "Création d'un compte de service mandataire"

    When I enter "Pas" as "#react-select-3-input"
    Then I wait for text "Pas-de-Calais"
    And I click on "#react-select-3-option-77"

    When I click on "#service"
    Then I click on "#react-select-4-option-0"

  Scenario: Tribunal d'instance
    When I click on "Créer votre compte emjpm"
    Then I should redirected to "/signup" page
    Then I see "Création de compte"

    When I click on "#type"
    Then I see "Tribunal d'instance"
    And I click on "#react-select-2-option-3"

    Then I fill in the following
      | Email                              | manu@email.com               |
      | Mot de passe                       | JaimeLesFrites123456?        |
      | Confirmation du mot de passe       | JaimeLesFrites123456?        |
      | Nom                                | Spontex                      |
      | Prénom                             | Manu                         |
    And I click on "Suivant"
    Then I see "Création d'un compte de magistrat"

    When I click on "#ti"
    And I click on "#react-select-3-option-0"
    When I enter "2A" as "Cabinet (optionnel)"
    Then I click on "Enregistrer" 
    Then I should redirected to "/signup/congratulation" page
    
    When I see "Votre demande d'inscription est terminée"
    And I click on "Se connecter"
    Then I should redirected to "/login" page    

  Scenario: Tribunal d'instance
    When I click on "Créer votre compte emjpm"
    Then I should redirected to "/signup" page
    Then I see "Création de compte"

    When I click on "#type"
    Then I see "Agent de l'état"
    And I click on "#react-select-2-option-4"

    Then I fill in the following
      | Email                              | manu@email.com               |
      | Mot de passe                       | JaimeLesFrites123456?        |
      | Confirmation du mot de passe       | JaimeLesFrites123456?        |
      | Nom                                | Spontex                      |
      | Prénom                             | Manu                         |
    And I click on "Suivant"
    Then I see "Création d'un compte d'agent de l'état"

    When I click on "#directionType"
    And I click on "#react-select-3-option-0"
    Then I click on "Enregistrer" 
    Then I should redirected to "/signup/congratulation" page

    When I see "Votre demande d'inscription est terminée"
    And I click on "Se connecter"
    Then I should redirected to "/login" page        