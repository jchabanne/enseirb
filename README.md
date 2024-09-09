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

## 1. Lecture de code

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

- [amélioration 1](https://github.com/jchabanne/enseirb/blob/refactoring/computeV1.js)
- [amélioration 2](https://github.com/jchabanne/enseirb/blob/refactoring/computeV2.js)

Comparer le style de code entre les 2 fichiers :
- [postComment.js](https://github.com/jchabanne/enseirb/blob/refactoring/postComment.js)
- [createProduct.js](https://github.com/jchabanne/enseirb/blob/refactoring/createProduct.js)

### Critères de lisiblité

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

## 2. Exercice

Dans votre dépôt git, créer une branche `refactoring` **depuis la branche `master`**

```sh
$ git switch master
$ git switch -c refactoring
```

### 2-a. Echauffement

Créer un fichier `warmup.js` ou `warmup.py` (selon préférence du langage) et *refactorer* le code suivant :

#### Version javascript

```javascript
const a = ["foo", "bar"][Math.random() < 0.5 ? 0 : 1]
const b = [1, 2][Math.random() < 0.5 ? 0 : 1]
const c = [["foo"], ["bar"]][Math.random() < 0.5 ? 0 : 1]
```

#### Version python

```python
from random import randint

a = ["foo", "bar"][randint(0, 1)]
b = [0, 1][randint(0, 1)]
c = [["foo"], ["bar"]][randint(0, 1)]
```

> Faire un commit (ne pas négliger le message)

#### Solution

- [warmup.js](https://github.com/jchabanne/enseirb/blob/refactoring/warmup.js)
- [warmup.py](https://github.com/jchabanne/enseirb/blob/refactoring/warmup.py)

### 2-b. Cas concret

- Choisir un bout de code pertinent (et pas trop gros) sur un projet existant.
- Copier ce bout de code dans votre dépôt.
- Faire un commit.

> Ce n'est pas grave si le code ne compile ou ne fonctionne pas.

Modifier votre code pour appliquer quelques principes de refactoring.  
Ne pas hésiter à faire plusieurs commits intermédiaires (ne pas oublier le *squash*).

Quand c'est terminé : `git push origin refactoring`
