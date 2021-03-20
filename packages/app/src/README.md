# structure du package
Merci de respecter cette structure afin de laisser le projet propre
et aisément compréhensible pour tous.
```
.
├── public
├── src
│   ├──
│   └── routes
│   └── pages
│   └── containers
│   └── components
│   └── validation-schemas
│   └── hooks
│   └── query-service
│   └── apollo
│   └── formatters
│   └── constants
│   └── config
│   └── theme
│   └── utils
└── package.json
```

# structure du dossier /src

## /
Racine du code source projet: /src
Correspond à `~` dans la résolution des chemins importés.
Il y a également le chemin `~public`, qui correspond à `/public`, et qui est copié dans la dist lors du build.
- `index.js` contient l'initialisation de React (c'est le point d'entrée).
- `App.js` contient le layout global ainsi que les appels aux outils
et contextes implémentés globalement.

## routes
Contient les définitions du routage.
Implémente la disctinction entre routes publiques et privées.
Le routage est basé sur la [même convention que nextjs](https://essential-dev-skills.com/nextjs/developpons-avec-next/le-routing).
En résumé: un path d'url = un fichier dans le dossier pages.
Pour info: nous n'utilisions pas nextjs car non adapté au projet, mais sa convention de nommage est resté, à la fois pour des raisons historiques mais également parce qu'elle est bien pensée, le routing n'est cependant pas dynamique, il faut implémenter chaque route dans `routes/Routes.js`, cela offre une grande flexibilité.
Le routage est basé sur [react router](https://reactrouter.com/web), la référence pour le routage react sur le web.

## /pages
Ce sont les composants react du premier niveau appelés directement par le routage.
Les parametres sont à mettre entre crochets dans le nom du fichier ou du dossier,
ex: /pages/admin/users/[user_id]/delete.js
Les pages utilisent des containers.

## /containers
Composants react spécifique au projet et à sa logique métier.
Ils sont utilisés par les pages et peuvent dépendre les uns des autres.
Privilégiez l'usage du `export default` par composant lorsque cela est pertinent.

## /components
Composants react génériques, concerne l'UI/UX et sont à usage généraux,
ils sont utilisés dans containers (et possiblement dans pages)
Toujours faire un `export default` par composant.
Bonnes pratiques React:
- utilisez des fonctions nommées pour exporter vos composants react et non des const avec des arrow functions afin de permettre la lecture des bugs dans les source maps.
- plutôt que d'utiliser des `index.js` en tant que proxy d'export et de recréer un fichier nommé pour vos composants, adaptez votre IDE afin qu'il s'appuie sur le nom du dossier lorsqu'il rencontre un fichier nommé `index.js`, examples:  
  - [VSCode](https://code.visualstudio.com/) a le plugin [nice-index](https://marketplace.visualstudio.com/items?itemName=stekoshy.nice-index) pour cela.
  - [Atom](https://atom.io/) a le plugin [tab-foldername-index](https://atom.io/packages/tab-foldername-index) pour cela.

## /validation-schemas
Utilisés par les containers pour valider les formulaires, basé sur [yup](https://github.com/jquense/yup).

## /hooks
Hooks react réutilisables, généraux et métiers.
Important: bien étudier la [documentation react](https://fr.reactjs.org/docs/hooks-reference.html) à ce sujet.
Toujours faire un `export default` par hook.

## /query-service
Requêtes vers des API, qu'elles soient tierces ou locales.

## /apollo
Contient le contexte et la config [apollo](https://www.apollographql.com/) pour l'accès à [GraphQL](https://graphql.org/) et [Hasura](https://hasura.io/).

## /formatters
Fonctions métier partageable de traitements d'objets de données.
Contient des fonctions qui sont destinées à produire des structures de données en réponse à des données reçues en paramètres.

## /user
Contient l'authentification, la contexte de l'utilisateur, les stats (matomo), le feedback (sentry) etc...

## /config
Contient la config, c'est ici qu'on récupère les variables d'environnement,
les token d'api tierces etc...
Ne pas disperser la config et l'usage des variables d'environnement ailleurs qu'ici.

## /constants
Contient les constantes métier ou plus générales qui seront réutilisées à de multiples endroits.
Cela permet de centraliser, et donc d'améliorer la maintenabilité des définitions textuelles (qu'elles soient à des fins programmatiques ou UI).
Il y a aussi un gain possible en terme d'optimisation de la compression du bundle final.
N'oubliez pas que le package `@emjpm/biz`, présent dans `/packages/biz` à la racine du projet, contient les constantes, fonctions et logiques partageable entre le package `@emjpm/app` (celui-ci), et `@emjpm/api`, évitez donc les doublons.

## /theme
Contient le theme global, utilisé dans `/App.js` et transmis par le contexte dans tout le projet via [theme-ui](https://theme-ui.com/).

## /utils
Contient tous les outils plus ou moins standards dont on peut avoir besoin dans le reste du projet.
C'est un peu une trousse à outils qu'on va enrichir en fonction des besoins du projet, faute d'avoir trouvé un outil spécifique déjà adapté au besoin.
C'est là que vont se retrouver toutes les idées brillantes et autres fabuleux snippets chippés sur stackoverflow.
À utiliser avec modération. L'abus de snippets est dangereux pour la qualité du code. Merci de développer prudemment, et de vous tenir loin du clavier après l'excès de boisson.

## /utils/std
Std signifie standard, c'est donc là qu'il faut mette tout ce qui pourrait être une fonction native du language, comme par exemple des traitements généraux sur les chaines de caractères, les arrays ou autre.
