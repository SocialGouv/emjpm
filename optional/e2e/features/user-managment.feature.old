@user_managment
Feature: Manage EMJPM users
  In order give access to EMJJM
  As the administrator
  I want to be able to (de)activate users

  Background: Navigate to HomePage
    Given a clean test database
    Given a web browser is on EMJJM

  @user_managment_activate
  Scenario: Activate Doug account

    When I enter "inactive2" as "Identifiant"
    And I enter "inactive2" as "Mot de passe"
    And I click on "Me connecter"
    Then I see "Votre compte n'est pas encore actif, il sera validé très bientôt par l'équipe e-mjpm."

    When I enter "admin" as "Identifiant"
    And I enter "admin" as "Mot de passe"
    And I click on "Me connecter"
    Then I should redirected to "/admin" page
    And I see "Administration e-MJPM"

    When I see "Gestion des utilisateurs"
    And I see "En attente de validation"
    # NOTE(douglasduteil): use attribute selection
    # Looks like Codecept can't click on non clickable elements by default
    And I click on "[data-cy='En attente de validation']"
    Then I see "Paul"
    And I see "Doug"

    Then I click on "Activer" on the line with "Doug"
    And I see "Désactiver"

    When I click on "Se déconnecter"
    Then I should redirected to "/login" page

    When I enter "inactive2" as "Identifiant"
    And I enter "inactive2" as "Mot de passe"
    And I click on "Me connecter"
    Then I should redirected to "/mandataires" page


  @user_managment_desactivate
  Scenario: Desactivate Adrien account

    When I enter "jeremy" as "Identifiant"
    And I enter "johnson123" as "Mot de passe"
    And I click on "Me connecter"
    Then I should redirected to "/mandataires" page
    When I click on "Se déconnecter"
    Then I should redirected to "/login" page

    When I enter "admin" as "Identifiant"
    And I enter "admin" as "Mot de passe"
    And I click on "Me connecter"
    Then I should redirected to "/admin" page
    And I see "Administration e-MJPM"

    Then I see "Adrien"

    Then I click on "Désactiver" on the line with "Adrien"
    And I see "Activer"

    When I click on "Se déconnecter"
    Then I should redirected to "/login" page

    When I enter "jeremy" as "Identifiant"
    And I enter "johnson123" as "Mot de passe"
    And I click on "Me connecter"
    Then I see "Votre compte n'est pas encore actif, il sera validé très bientôt par l'équipe e-mjpm."
