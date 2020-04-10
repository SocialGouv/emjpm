@login
Feature: Login to EMJPM
  In order use EMJPM
  As a user
  I want to be able to login

  Background: Navigate to HomePage
    Given a clean test database
    Given a web browser is on EMJPM

  @login_individuel
  Scenario: Individuel login
    When I enter "jeremy" as "Votre nom d'utilisateur"
    When I enter "johnson123" as "Votre mot de passe"
    And I click on "Se connecter"
    Then I should redirected to "/mandataires" page

  @login_prepose
  Scenario: Prepose login
    When I enter "kelly" as "Votre nom d'utilisateur"
    When I enter "bryant123" as "Votre mot de passe"
    And I click on "Se connecter"
    Then I should redirected to "/mandataires" page

  @login_service
  Scenario: Service login
    When I enter "service1" as "Votre nom d'utilisateur"
    When I enter "service1" as "Votre mot de passe"
    And I click on "Se connecter"
    Then I should redirected to "/services" page

  @login_admin
  Scenario: Admin login
    When I enter "admin" as "Votre nom d'utilisateur"
    When I enter "admin" as "Votre mot de passe"
    And I click on "Se connecter"
    Then I should redirected to "/admin" page

  @login_ti
  Scenario: Tribunal d'instance login
    When I enter "ti1" as "Votre nom d'utilisateur"
    When I enter "ti1" as "Votre mot de passe"
    And I click on "Se connecter"
    Then I should redirected to "/magistrats" page
