# language: fr

@login
Fonctionnalité: Se connecter à EMJJM

  Pour pouvoir utiliser EMJPM
  En tant que visiteur
  Je veux être pouvoir me connecter

  Contexte: La page d'acceuil
    Soit une nouvelle base de donnée
    Et un navigateur web sur le site

  @login_role
  Plan du scénario: Se connecter en tant que <role>
    Quand je tape "<email>" dans le champ "Votre nom d'utilisateur"
    Et je tape "emjpm2019" dans le champ "Votre mot de passe"
    Quand je clique sur "Se connecter"
    Alors je suis redirigé vers la page: "<page>"

    Exemples:
      | role       | email                     | page         |
      | admin      | admin-45@justice.fr       | /admin       |
      | direction  | direction-823@justice.fr  | /direction   |
      | individuel | individuel-134@justice.fr | /mandataires |
      | prepose    | prepose-63@justice.fr     | /mandataires |
      | service    | service-2042@justice.fr   | /services    |
      | ti         | ti-136@justice.fr         | /magistrats  |
