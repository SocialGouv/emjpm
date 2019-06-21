@login
Feature: Login to EMJJM
  In order use EMJJM
  As a user
  I want to be able to login

  Background: Navigate to HomePage
    Given a clean test database
    Given a web browser is on EMJJM

  @login_individuel
  Scenario: Individuel login
    When I enter "jeremy" as "Identifiant"
    When I enter "johnson123" as "Mot de passe"
    And I click on "Me connecter"
    Then I should redirected to "/mandataires" page

  @login_prepose
  Scenario: Prepose login
    When I enter "kelly" as "Identifiant"
    When I enter "bryant123" as "Mot de passe"
    And I click on "Me connecter"
    Then I should redirected to "/mandataires" page

  @login_service
  Scenario: Service login
    When I enter "service1" as "Identifiant"
    When I enter "service1" as "Mot de passe"
    And I click on "Me connecter"
    Then I should redirected to "/services" page

  @login_admin
  Scenario: Admin login
    When I enter "admin" as "Identifiant"
    When I enter "admin" as "Mot de passe"
    And I click on "Me connecter"
    Then I should redirected to "/admin" page

  @login_ti
  Scenario: Tribunal d'instance login
    When I enter "ti1" as "Identifiant"
    When I enter "ti1" as "Mot de passe"
    And I click on "Me connecter"
    Then I should redirected to "/tis" page
