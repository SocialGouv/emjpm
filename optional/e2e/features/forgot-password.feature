#language: fr

@forgot_password
Fonctionnalité: Mot de passe oublié

  Dans le cas où j'ai oublié mon mot de passe
  En tant qu'utilisateur
  Je veux pouvour réinitialisation mon mot de passe

  Scénario: Context par default
    Soit une nouvelle base de donnée
    Et un navigateur web sur le site
    Et une boite mail vide

  Scénario: Je vais cliquer sur le lien dans la page d'accueil
    Quand je clique sur "J'ai oublié mon mot de passe et / ou mon identifiant"
    Alors je suis redirigé vers la page: "/account/forgot-password"
    Et je vois "Demander un nouveau mot de passe"

  Scénario: Je remplie le formulaire de réinitialisation
    Quand je tape "individuel-134@justice.fr" dans le champ "Entrez votre email"
    Et je clique sur "Obtenir le lien de réinitialisation"
    Alors je vois "Un email avec un lien de réinitialisation vient de vous être envoyé."

  Scénario: Je reçois un mail de réinitialisation
    Quand j'ai un message non lu dans ma boite mail
    Et j'ouvre le dernier mail non lu
    Alors je vois dans le mail
      | subject                | Nouveau mot de passe pour e-MJPM      |
      | envelope.from.address  | support.emjpm@fabrique.social.gouv.fr |
      | envelope.to[0].address | individuel-134@justice.fr             |

    Quand dans le mail, je clique sur le lien "\/account/reset-password\?token=.{16}"
    Alors je suis redirigé vers la page: "/account/reset-password"
    Et je vois "Modifier votre mot de passe"

  Scénario: Je choisie mon nouveau mot de passe
    Quand je remplie les champs suivants
      | Entrez votre nouveau mot de passe    | JaimeLesChips123456? |
      | Confirmer votre nouveau mot de passe | JaimeLesChips123456? |
    Et je clique sur "Enregistrer mon nouveau mot de passe"
    Alors je vois "Votre mot de passe a bien été changé, vous allez être redirigé vers la page de connexion"
    Et je suis redirigé vers la page: "/login"

    Quand j'ai un message non lu dans ma boite mail
    Et j'ouvre le dernier mail non lu
    Alors je vois dans le mail
      | subject                | Confirmation du mot de passe          |
      | envelope.from.address  | support.emjpm@fabrique.social.gouv.fr |
      | envelope.to[0].address | individuel-134@justice.fr             |

  Scénario: Je test mon nouveau mot de passe
    Soit un navigateur web sur le site
    Quand je tape "individuel-134@justice.fr" dans le champ "Votre nom d'utilisateur"
    Et je tape "JaimeLesChips123456?" dans le champ "Votre mot de passe"
    Et je clique sur "Se connecter"
    Alors je suis redirigé vers la page: "/mandataires"
