@forgot_password
Feature: Forgot password
  In order to recover a forgotten password
  As a registered user
  I want to be able to reset my password

  Background: Navigate to HomePage
    Given a clean test database
    Given a web browser is on EMJPM
    And an empty inbox

  Scenario: Adrien (ud@ud.com) forgot his password
    When I click on "J'ai oublié mon mot de passe et / ou mon identifiant"
    Then I should redirected to "/account/forgot-password" page
    Then I see "Demander un nouveau mot de passe"
    
    When I enter "ud@ud.com" as "Entrez votre email"
    Then I click on "Obtenir le lien de réinitialisation"

    Then I have one unread message in my indox
    And I consult the last unread message
    Given the last email as the following info
      | subject         | Nouveau mot de passe pour e-MJPM |
      | from[0].address | support.emjpm@fabrique.social.gouv.fr |
      | to[0].address   | ud@ud.com |
    Given I see "Un email avec un lien de réinitialisation vient de vous être envoyé."

    When I click on the "\/account/reset-password\?token=.{16}" link in the last email
    When I fill in the following
      | Entrez votre nouveau mot de passe      | JaimeLesChips123456? |
      | Confirmer votre nouveau mot de passe | JaimeLesChips123456? |
    Then I click on "Enregistrer mon nouveau mot de passe"
    Given I see "Votre mot de passe a bien été changé, vous allez être redirigé vers la page de connexion"
    Then I should redirected to "/login" page

    Then I have one unread message in my indox
    And I consult the last unread message
    Given the last email as the following info
      | subject         | Confirmation du mot de passe |
      | from[0].address | support.emjpm@fabrique.social.gouv.fr   |
      | to[0].address   | ud@ud.com                    |

    Given a web browser is on EMJPM
    When I enter "jeremy" as "Votre nom d'utilisateur"
    When I enter "JaimeLesChips123456?" as "Votre mot de passe"
    And I click on "Se connecter"
    Then I should redirected to "/mandataires" page
    