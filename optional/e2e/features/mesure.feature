#language: fr

@mesure
Fonctionnalité: Attribution d'une mesure par un tribunal
  En tant que tribunal
  Je veux attribuer une mesure

  Contexte:
      Etant donné que la base de donnée est initialisée
      Et que je suis connecté en tant que tribunal
      Et que je suis redirigé sur la page "/magistrats"
      Et que la page est totalement chargée
      
  Scénario: Attribuer une mesure à un mandataire individuel
    Etant donnée que je navigue sur la page "/magistrats/gestionnaires/individuel-283"
    Quand je clique sur "Réserver une mesure"
    Alors je suis redirigé sur la page "/magistrats/gestionnaires/individuel-283/reservation"
    Quand je soumets le formulaire
    Alors le formulaire comporte des erreurs
    # Quand je remplis les champs du formulaire de réservation
