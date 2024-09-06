# Git

> Dans un dossier temporaire de votre choix, initialiser un projet git :

```sh
$ mkdir ~/some/directory/tp-git
$ cd ~/some/directory/tp-git
$ git init
```

> Vous pourrez supprimer ce dossier à la fin du TP

## 1. Concept

> Git, c'est quoi ?

Git est un outil de type SCM (*source code management*).
Il sert à tracer les modifications du code.

> Pourquoi utiliser un SCM ?

- backup (panne disque dur, perte / vol ordinateur, ...)
- historique des modifications
- partage du code (collaboration, absence d'un membre)

> Git, un système décentralisé

On peut se brancher sur plusieurs *remotes* à la fois.
Quand on clone un dépôt on est lié au *remote* `origin` par défaut. 

Toutefois, on l'utilise souvent comme un système centralisé,
en parliculier avec un fournisseur comme Github ou Gitlab.

## 2. Fonctionnement

> Basé sur la [conférence de Sébastien Lecacheur](https://www.youtube.com/watch?v=uA2WZCQP4EI)

Il existe 2 types de commandes dans le modèle de git :
- Commandes *porcelaine* (haut niveau: add, commit, merge...)
- Commandes *plomberie* (bas niveau: hash-object, cat-file, show-refs)

### 2-a. Map persistante

Tout ce que manipule git est considéré comme un objet. Ces objets sont enregistrés sous forme de clé / valeur :
- clé: hash (sha1)
- valeur: séquence d'octets

#### L'objet *blob*

```sh
$ git init --quiet
$ echo "map persistante" | git hash-object --stdin -w
```

Un dossier a été créé dans le dossier `.git/objects` contenant un fichier
dont le nom correspond au hash retourné par la commande.
Il s'agit d'un fichier binaire (notamment pour la compression) mais git propose une commande pour l'examiner.

```sh
$ git cat-file -t <hash> # retourne le type de fichier
$ git cat-file -p <hash> # affiche le contenu
```

> Le *blob* est en quelque sorte la brique de base

### 2-b. Suivi de contenu

Git suit le contenu d'un projet grâce à une structure arborescente d'objets.

#### Les objets *tree* et *commit*

```sh
$ echo "python" > language.txt
$ mkdir python
$ echo "print('Python is cool !')" > python/main.py
$ git add .
$ git commit -m "Add python language"
$ git log
$ git cat-file -t <commit-id>
$ git cat-file -p <commit-id>
$ git cat-file -p <tree-id>
$ git cat-file -p <sub-tree-id>
```

> L'objet *commit* pointe vers un objet *tree* qui pointe vers des objets *tree* et / ou *blob*.

```sh
$ echo "print('Python is super cool !')" > python/main.py
$ git add .
$ git commit -m "Fix python language"
$ git log
$ git cat-file -p <commit-id>
```

> Une propiété `parent` contient le hash du commit précédent.

### 2-c. Suivi de version

#### Branche

Une branche est un simple fichier stocké dans le répertoire `.git/refs/heads`.
Il contient un hash de commit.

La branche courante est enregistrée dans le fichier `.git/HEAD`.

```sh
$ git switch -c python
$ echo "print('Python is better than Groovy !')" >> python/main.py
$ git add .
$ git commit -m "Update python language (groovy comparison)"
$ cat .git/refs/heads/python
$ cat .git/HEAD
```

#### Merge

Dans les cas simples, git fait un *fast forward*.
Il "déplace" le pointeur de commit.

```sh
$ git switch master
$ git merge python
$ git log
$ cat .git/refs/heads/master
```

En cas de divergence entre 2 branches, git génère un commit de merge.

```sh
$ git switch -c javascript
$ mkdir javascript
$ echo "console.log('Javascript is weird !');" > javascript/index.js
$ git add .
$ git commit -m "Add javascript language"
```

```sh
$ git switch python
$ echo "print('But Python is not better than Ruby !')" >> python/main.py
$ git add .
$ git commit -m "Update python language (ruby comparison)"
```

```sh
$ git switch master
$ git merge python
$ git merge javascript
$ git log # on constate 2 commits parents
$ git cat-file -p <merge-commit-id>
```

#### Rebase

Le rebase permet (entre autres) de conserver un historique linéaire en réordonnant les commits.

```sh
$ git switch python
$ git merge master # on re-synchronise la branche python avec master
$ echo "print('Python forever !')" >> python/main.py
$ git add .
$ git commit -m "Last python language update"
```

```sh
$ git switch javascript
$ git merge master
$ echo "console.log('Javascript is weirder than any other language !');" >> javascript/index.js
$ git add .
$ git commit -m "Update javascript language"
```

```sh
$ git switch master
$ git merge python
$ git switch javascript
$ git rebase master
$ git switch master
$ git merge javascript
$ git log # les commits sont linéaires
```

#### Squash

Le `squash` permet de regrouper plusieurs commits en un seul afin d'avoir un historique plus clair.

```sh
$ git switch master # si besoin
$ echo "Awesome language" >> language.txt
$ echo "- Haskell" >> language.txt
$ git add .
$ git commit -m "Add haskell language"

$ echo "- Go" >> language.txt
$ git add .
$ git commit -m "Add go language"

$ echo "- Rust" >> language.txt
$ git add .
$ git commit -m "Add rust language"
```

Pour réaliser un *squash*, on utilise la commande `rebase` en mode interactif.

```sh
$ git rebase -i HEAD~3
# suivre la notice fournie par git
```

En cas de difficulté, annuler le rebase avec la commande : 
```sh
$ git rebase --abort
```

## 3. Git flow

Ensemble d'extensions git définissant un modèle d'utilisation des branches.

> Exemple :
> - `git flow feature start <name>`
> - `git flow release publish <name>`
> - `git flow hotfix start <name>`

Le modèle présenté ci-dessous est une version simplifiée.

#### Branche `main`

Code correspondant à la production ou à la prochaine version déployée.
Les branches de fonctionnalité **ne sont pas** directement mergées sur `main`.
Cette branche doit rester stable (sinon il y a un problème sur la prod).

#### Branche `develop`

Code correspondant aux fonctionnalités qui seront mergées sur `main`.
Les branches de fonctionnalité sont créées à partir de `develop`.
Cette branche doit rester stable pour ne pas bloquer les nouvelles fonctionnalités.

#### Branche de fonctionnalité

Permet de travailler de manière isolée.

#### Tag

Créé depuis la branche `main`, un tag fige la version qui est déployée en production.
On peut tirer une branche de correction depuis un tag précédent si besoin.

#### Branche de correction

Si nécessaire, une branche de correction peut être tirée depuis `main` ou depuis un tag.
Cette branche doit ensuite être mergée sur `develop`.

## 4. Manipulation de commits

### 4-a. Amend

> Permet de modifier le dernier commit

#### Modifier le message de commit

```sh
$ git switch master # si besoin
$ git commit --amend -m "Add awesome languages"
```

#### Ajouter une modification

```sh
$ echo "- Elixir" >> language.txt
$ git add .
$ git commit --amend --no-edit
$ git log
```

L'option no-edit permet de conserver le message du commit.

> ATTENTION : ne modifier que des commits locaux

### 4-b. Stash

> Permet de mettre de côté les modifications en cours

```sh
$ echo "Old language" >> language.txt
$ echo "- Pascal" >> language.txt
$ git stash
$ git stash list
```

Pour récupérer les modifications, on peut utiliser la commande `stash apply` ou `stash pop`.
La seconde supprime le *stash*.

```sh
$ git stash apply
$ git stash list
$ git checkout language.txt
$ git stash pop
$ git stash list
```

> Par défaut, git ne stash pas les fichiers non trackés

On peut utiliser l'option `-u` pour les ajouter plus facilement.

```sh
$ echo "Java tuto" > java.txt
$ git status
$ git stash -u
$ git status
```

On peut supprimer un *stash* via son index, ou tous les *stash* d'un coup.

```sh
$ git stash drop stash@{0} # supprime le stash n°0
$ git stash clear # supprime tous les stash
```

On peut ajouter un message au *stash* pour mieux s'y retrouver.

```sh
$ echo "- Fortran" >> language.txt
$ git stash save "Add fortran language" # ou git stash -m "<message>"
$ git stash list
$ git stash clear
```

### 4-c. Reset

Git fonctionne avec 3 zones :
- *working directory*
- *staging index*
- *commit history*

> La commande `reset` permet de supprimer des commits et de revenir sur l'une des zones précédentes

```sh
$ git reset HEAD~1
$ git log
$ git status
$ git add .
$ git commit -m "Add awesome languages"
```

> Par défaut on revient sur le *working directory*

L'option `--soft` permet de revenir sur le *staging index*.

```sh
$ git reset --soft HEAD~1
$ git status
$ git commit -m "Add awesome languages"
```

L'option `--hard` supprime totalement les modifications.

```sh
$ git reset --hard HEAD~1
$ git status
$ git log
```

## 5. Alias

Les alias permettent de faciliter l'utilisation des commandes git au quotidien.
Ils sont stockés dans la configuration de git.

Il existe 3 fichiers pour gérer cette configuration :
- `/etc/gitconfig` (*system*)
- `~/.gitconfig` (*global*)
- `.git/config` (*local*)

On enregistre généralement les alias dans la config globale.

### Alias basique

```sh
$ git config --global alias.st 'status'
```

### Commande externe simple

```sh
$ git config --global alias.cfg '!less ~/.gitconfig'
```

### Commande externe avancée

```sh
$ git config --global alias.release '!f() { git tag $1; git push origin tag $1;}; f'
```

## 6. Réfléxions

- A quelle fréquence faut-il commit ?
- A quelle fréquence faut-il push ?
- Comment éviter des merges complexes (pouvant entrainer des conflits) ?
- C'est quoi un bon message de commit ?
