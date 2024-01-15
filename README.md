# Test

> Qui teste son code ? Comment ?

> Pourquoi écrire des tests ?

> Que faut-il tester ?

## Pyramide des tests

Il n'y a pas de nomenclature officielle. Ceci est une définition parmi d'autres

De bas en haut :
- *tests unitaires ($)* : simples, rapides et ne nécessitant aucune dépendance
- *tests d'intégration ($$)* : valident le projet dans son ensemble
- *tests systeme ($$$$)* : valident l'interaction de plusieurs projets
- *tests end to end ($$$$$$)* : valident l'intégralité de la stack applicative

## Fonctionnement

2 outils sont nécessaires pour éxecuter des tests :
- un *test runner*
- une bibliothèque d'assertions

On peut rajouter si besoin une bibliothèque de *mock*.
