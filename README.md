# Clean code

> C'est quoi la qualité du code ?

> Pourquoi c'est important ?

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

## Critères de lisiblité

Comment écrire la fonction précédentes de manière plus lisible ?

## Exercice

> Créer une branche `refactoring` depuis la branche `main`.
