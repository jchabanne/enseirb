# Pair programming

## Réflexion

- C'est quoi le pair programming ?
- Quels sont les a priori sur cette pratique ?
- Le coût de développement est-il multiplié par 2 ?
- Faut-il le pratiquer tout le temps ?

## Avantages

- Appropiation collective du code
  - le code est plus clair
  - le style du code est plus homogène
  - les conventions de code sont mieux diffusées
  - **on est capable de reprendre plus facilement le code des autres** (bus factor)

- Conception de meilleure qualité
  - pour trouver une solution technique
  - pour élaborer un design
  - pour résoudre un problème

- Montée en compétence plus efficace
  - sur un framework, un langage, un outil
  - sur une pratique ou un process
  - sur l'historique du projet
  - **c'est valable quelle que soit l'expérience ou l'ancienneté**

- Réduction des bugs
  - 2 personnes lisent et valident le code
  - valable pour les gros bugs comme pour les petits qui ralentissent le développement

- Moins de baisse de motivation
  - en particulier sur les tâches pénibles

> L'efficacité du pair programming augmente à mesure que l'équipe se connaît mieux.

## Pratique

On distingue 2 rôles :
- le **driver** écrit le code
- le **navigator** relit attentivement, donne son avis, note les tâches à implémenter

Il est préférable d'alterner les rôles régulièrement.

### Rotation des pairs

Une grosse partie de l'efficacité du pair programming vient de la rotation des paires.

La fréquence de rotation varie selon les contextes. Mais le faire tous les un ou deux jours est une bonne base.

#### Exemple

Pour une équipe de 6 personnes avec rotation quotidienne et une fonctionnalité implémentée sur 3 jours :
- 4 personnes ont codé sur la fonctionnalité (1-2 | 2-3 | 3-4)
- 2 personnes ont vu l'intégratité du code (3 et 4)
- 3 paires (1-3, 2-3, 2-4) maîtrisent l'ensemble du code

## Mob programming

Si on pousse la pratique à l’extrème, on obtient du mob programming (toute l’équipe travaille sur la même fonctionnalité).

Cette discipline requiert une certaine organisation, surtout sur l’agencement du bureau.

## Code review

Cette pratique peut être une alternative au pair programming.

Par principe, on est moins proactif car la relecture se fait à la fin de la fonctionnalité,
ce qui peut entraîner une modification tardive du code.

On s'expose aussi à une analyse plus superficielle du code car ce n'est pas forcément une tâche très intéressante.

On peut mitiger ce risque en faisant la relecture avec la personne qui a developpé la fonctionnalité.
