# Refactoring

> Le refactoring consiste à modifier le code sans ajouter ou modifier de fonctionnalités.

C'est quoi la qualité du code ?

- Code lisible
- Code fiable (test)
- Code évolutif (découplage, pattern)
- Code performant (algo, optimisation)

Pourquoi c'est important ?

- Comprendre le code plus vite, plus facilement (pour les autres ET sois-même)
- Réduire le risque de bug

Quand le faire ?

- Au quotidien au fil de l'implémentation
- Avant une fonctionnalité pour préparer le terrain
- Après une fonctionnalité pour nettoyers

## Cas pratique

Que fait cette fonction ?

```javascript
function compute(arr) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] % 2 === 0) {
            result.push(arr[i]);
        }
    }
    return result;
}
```

Comment écrire cette fonction de manière plus lisible ?

## Critères de lisiblité

- Nommage (fonction, paramètre, variable, classe, fichier, dossier)
  - éviter les abréviations (l'IDE fait la complétion)
  - généralement un verbe pour les fonctions
- Longueur des fonctions
- Longueur des fichiers
- Paramètres des fonctions
  - minimiser le nombre de paramètres (créer des structures de données)
  - éviter d'avoir trop de paramètres de type primitif
- Commentaire
  - éviter les commentaires redondants
  - expliquer le *pourquoi* et non le *quoi*
- Duplication
- Découplage
  - chaque fonction ou classe a une seule responsabilité

## Exercice

- Créer une branche `refactoring` depuis la branche `main`.
- Choisir un bout de code pertinent (et pas trop gros) sur un projet existant.
- Créer un fichier sur la branche `refactoring` avec ce bout de code.

> Faire un commit et push

> Ce n'est pas grave si le code ne compile ou ne fonctionne pas.

Modifier votre code pour appliquer quelques principes de refactoring.

> Faire un commit et push

Faire relire son code à une autre personne
