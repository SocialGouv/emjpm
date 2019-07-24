@forgot_password
Feature: Forgot password
  In order to recover a forgotten password
  As a registered user
  I want to be able to reset my password

  Background: Navigate to HomePage
    Given a clean test database
    And an empty inbox
    Given a web browser is on EMJJM

  Scenario: Adrien (ud@ud.com) forgot his password
    When I click on "J'ai oublié mon mot de passe et / ou mon identifiant"

    Given I see "Récupérer votre compte"
    When I enter "ud@ud.com" as "email"
    Then I click on "Demander mon mot de passe"

    Then I have one unread message in my indox
    And I consult the last unread message
    Given the last email as the following info
      | subject         | Nouveau mot de passe pour e-MJPM |
      | from[0].address | contact@emjpm.beta.gouv.fr       |
      | to[0].address   | ud@ud.com                        |

    When I click on the "\/reset-password\?token=.{16}" link in the last email
    Then I see "Mot de passe oublié"

    When I fill in the following
      | Nouveau mot de passe      | JaimeLesChips |
      | Vérification mot de passe | JaimeLesChips |
    # NOTE(douglasduteil): we should not accept popups...
    And I am accepting popups
    Then I click on "Réinitialiser mon mot de passe"
    # NOTE(douglasduteil): we should not accept popups...
    And I accept the popup

    Then I have one unread message in my indox
    And I consult the last unread message
    Given the last email as the following info
      | subject         | Confirmation du mot de passe |
      | from[0].address | contact@emjpm.beta.gouv.fr   |
      | to[0].address   | ud@ud.com                    |

    Given a web browser is on EMJJM
    When I enter "jeremy" as "Identifiant"
    When I enter "JaimeLesChips" as "Mot de passe"
    And I click on "Me connecter"
    Then I should redirected to "/mandataires" page
