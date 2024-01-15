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
2. Eviter d'adapter le code de production pour faciliter les tests (il y a des exceptions).

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

### 3-c. Logger

#### Étape 1

Coder un programme `logger` permettant d’écrire une information dans un fichier `log.txt`.

> logger.info("message à caractère informatif")  
> logger.info("un autre message)

Résultat attendu dans le fichier :

```
Message à caractère informatif
un autre message
```

**Python**

```python
# main.py

if __name__ == "__main__":
  logger.info("Message à caractère informatif")
  logger.info("un autre message")
```

```python
# snippet write file

with open(fileName, "a") as file:
  file.write(content)
```

**Javascript**

```javascript
// index.mjs

logger.info("Message à caractère informatif");
logger.info("un autre message");
```

```javascript
// snippet write file

import * as fs from "fs";

fs.appendFileSync(fileName, content);
```

> Faire un commit

#### Étape 2

Écrire un mock permettant de tester la fonction `logger.info` sans écrire dans le fichier `log.txt`.

> Faire un commit

#### Étape 3

Ajouter un timestamp pour chaque ligne d’information.

Résultat attendu dans le fichier :

```
2026-10-23T08:17:22.000Z : Message à caractère informatif
2026-10-23T11:41:39.000Z : un autre message
```

> Faire un commit

#### Étape 4

Modifier le test pour vérifier l’écriture de l’horodatage.

> Faire un commit

### 3-d Social media

#### Étape 1

Coder un programme qui récupère un post depuis l’API [jsonplaceholder](https://jsonplaceholder.typicode.com/)

> GET https://jsonplaceholder.typicode.com/posts/100

**Python**

```python
# main.py

if __name__ == "__main__":
  post = social_media.getPost(100)
  print(post)
```

```python
# snippet get request

import urllib.request
import json

try:
  with urllib.request.urlopen(url, timeout=10) as response:
    print("Status Code:", response.status)
    body = response.read().decode("utf-8")
    return json.loads(body)
except Exception as e:
  print(e)
```

**Javascript**

```javascript
// index.mjs

const post = await socialMedia.getPost(100);
console.log(post);
```

```javascript
// snippet get request

try {
  const response = await fetch(url);
  return await response.json();
} catch (e) {
  console.log(e);
}
```

> Faire un commit

#### Étape 2

Écrire un mock permettant de retourner un post arbitraire et tester la fonction `socialMedia.getPost` sans appeler l’API `jsonplaceholder`

> Faire un commit & push