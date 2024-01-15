# Test

> Qui teste son code ? Comment ?

Pourquoi écrire des tests ?

- valider le développement en cours
- assurer la non régréssion

## 1. Les bases

### Pyramide des tests

Il n'y a pas de nomenclature officielle. Ceci est une définition parmi d'autres.

De bas en haut :
- *tests unitaires ($)* : simples, rapides et ne nécessitant aucune dépendance
- *tests d'intégration ($$)* : valident le projet dans son ensemble
- *tests systeme ($$$$)* : valident l'interaction de plusieurs projets
- *tests end to end ($$$$$$)* : valident l'intégralité de la stack applicative

### Fonctionnement

2 outils sont nécessaires pour éxecuter des tests :
- un *test runner*
- une bibliothèque d'assertions

On peut rajouter si besoin une bibliothèque de *mock*.

### Anatomie

Un test se décompose généralement en 3 parties (la 1ere est optionnelle).
- l'initialisation (des données, des mocks)
- le déclenchement
- les assertions

> On retient ce découpage sous la forme *given / when / then* ou *arrange / act / assert*

## 2. Test driven development

### Cycle

1. Red = écrire un test qui échoue (ou ne compile pas)
2. Green = écrire le code minimal pour faire passer le test
3. Refacto = améliorer / nettoyer l'implémentation

### Règles

1. Un test qui passe directement est un test inutile (dans la plupart des cas).
2. Eviter d'adapter le code de production pour faciliter les tests (il y des exceptions).

### Avantages

- On obtient une meilleure couverture de code par défaut.
- Le code est plus facilement testable.
- On peut générer une partie non négligeable du code de production.

## 3. Exercice

Dans votre dépôt git, créer une branche `test` **depuis la branche `master`**.

```sh
$ git switch master
$ git switch -c test
```

### 3-a. Slot machine

> Langage au choix entre javascript ou python

La fonction `int slotMachine(string bet, string[] result)` prend en paramètre une mise et un résultat sous forme d'un tableau de 3 symboles.  
Elle retourne le gain calculé en fonction de la mise et du pattern de symboles.

#### Javascript

- Créer le fichier `slotMachine.js`

```javascript
export function slotMachine(bet, result) {
}
```

- Créer le fichier `slotMachine.test.js`

```javascript
import { test } from "node:test";
import assert from "node:assert";
import { slotMachine } from "./slotMachine.js";

test("change name", function () {
    assert.equal(1, 1);
});
```

Exécuter les tests : `node --test`

#### Python

- Créer le fichier `slot_machine.py`

```python
def slot_machine(bet, result):
```

- Créer le fichier `slot_machine_test.py`

```python
import unittest
from slot_machine import slot_machine

class SlotMachineTest(unittest.TestCase):
    def test_change_name(self): # le nom de la fonction doit commencer par test_
        self.assertEqual(1, 1)


if __name__ == "__main_":
    unittest.main()
```

Exécuter les tests : `python -m unittest slot_machine_test`

#### Consignes

- Implémenter la fonction pour retourner le double de la mise si les **2 premiers** symboles sont identiques. Sinon retourner 0.
  - exemple : `slotMachine(5, ['+', '+', '%'])` retourne `10`
  - écrire un test qui valide l'implémentation
  - faire un commit

- Modifier la fonction pour retourner le double de la mise si les **2 derniers** symboles sont identiques.
  - exemple : `slotMachine(5, ['%', '+', '+'])` retourne `10`
  - écrire un test qui valide l'implémentation
  - faire un commit

- Modifier la fonction retourner la mise x5 si les 3 symboles sont identiques.
  - exemple : `slotMachine(10, ['+', '+', '+'])` retourne `50`
  - écrire un test qui valide l'implémentation
  - faire un commit
  
- Modifier la fonction pour retourner la mise x20 si les 3 symboles sont le symbole *Jackpot* (`$`)
  - exemple : `slotMachine(50, ['$', '$', '$'])` retourne `1000`
  - écrire un test qui valide l'implémentation
  - faire un commit

### 3-b. Robot command parser

Le but est de parser un flux de commandes hexadécimales et de retourner des commandes exécutables par un robot.

**Précisions:**
- Le robot en lui-même est hors du scope de cet exercice, seul le parser nous intéresse.
- De même, l'implémentation de la *commande* n'est pas le plus important, faites simple!
- Le flux de commande est représenté sous forme de chaine de caractères 

#### Etapes

> Pour chaque étape, commencer par écrire un test, puis écrire le code **MINIMAL** permettant de faire passer le test.
>
> Faire un **commit après chaque étape**.

1. La commande hexa `0X123` est convertie en commande `moveForward`
2. La commande hexa `OX789` est convertie en commande `moveBackward`
3. La commande hexa `OXABC` est convertie en commande `stop`
4. Le flux peut contenir une suite de plusieurs commandes
5. Pour compresser le flux, quand une commande est répétée (successivement), indiquer le code hexa une seule fois avec le nombre d'occurrences

### Exercice 2 : bank balance

- Créer un fichier `bankDAO.js` exposant un object `bankDAO`.
- Définir la fonction `retrieveBalance` sur l'objet `bankDAO` qui affiche un log "Retrieve balance".

- Créer un fichier `bank.js` exposant un objet `bank`.
- Définir une fonction `getBalance` sur l'objet `bank` qui appelle la fonction `retrieveBalance`.

- Créer un fichier `main.js` qui appelle la fonction `getBalance`.
- Exécuter le fichier `main.js` et vérifier que le log s'affiche.

> Ecrire un test qui vérifie que la fonction `retrieveBalance` est bien appelée mais sans qu'elle ne soit exécutée.

- Ajouter un paramètre `accountId` aux fonctions `getBalance` et `retrieveBalance`.

> Ecrire un test qui vérifie que le paramètre est bien transmis.

- Modifier la fonction la fonction `getBalance` pour retourner le solde récupéré depuis la fonction `retrieveBalance`.

> Ecrire un test qui vérifie que le solde est bien retourné par la fonction `getBalance`.

### Excercice 3 : bank transfer

- Créer un fichier `bankTransfer.js` et définir une fonction `transfer` qui prend 2 paramètres, `accountId` et `amount`.

- Dans le fichier `bank.js` définir une fonction `transferMoney` qui prend 2 paramètres, `accountId` et `amount`, et appelle la fonction `transfer`.

> Ecrire un test qui valide l'appel avec les bons paramètres.

- Dans le fichier `bankDAO.js` définir une fonction `debitAccount` qui prend 2 paramètres: `accountId` et `amount`.

- Appeler la fonction `debitAccount` depuis la fonction `transferMoney`.

> Ecrire un test qui valide l'appel avec les bons paramètres.

- Modifier la fonction `transferMoney` pour ne pas appeler la fonction `debitAccount` si la fonction `transfer` retourne une erreur (i.e. une promesse rejetée).

> Ecrire un test qui valide ce fonctionnement
