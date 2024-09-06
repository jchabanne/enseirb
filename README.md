# Git

## Concept

> Git c'est quoi ?
> Quels sont les autres systèmes qui existent ?

Git est un outil de type SCM (*source code management*).
Il sert à tracer les modifications du code.

> Pourquoi utiliser un SCM ?

- backup (panne disque dur, perte / vol ordinateur, ...)
- historique des modifications
- partage du code (collaboration, absence d'un membre)

### Système décentralisé

Quand on clone un projet, l'intégralité du dépôt est récupéré.
On peut se brancher sur plusieurs *remotes* à la fois.

Toutefois, on l'utilise souvent comme un système centralisé,
en parliculier avec un fournisseur comme Github ou Gitlab.

## Fonctionnement

> Basé sur la [conférence de Sébastien Lecacheur](https://www.youtube.com/watch?v=uA2WZCQP4EI)

Il existe 2 types de commandes dans le modèle de git :
- Commandes *porcelaine* (haut niveau: add, commit, merge...)
- Commandes *plomberie* (bas niveau: hash-object, cat-file, show-refs)

### Map persistante

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

### Suivi de contenu

Git suit le contenu d'un projet grâce à une structure arborescente d'objets.

#### Les objets *tree* et *commit*

```sh
$ echo "it367" > enseirb.txt
$ mkdir it367
$ echo "git" > it367/cours.txt
$ git add .
$ git commit -m "enseirb"
$ git log
$ git cat-file -t <commit-id>
$ git cat-file -p <commit-id>
$ git cat-file -p <tree-id>
$ git cat-file -p <sub-tree-id>
```

> L'objet *commit* pointe vers un objet *tree* qui pointe vers des objets *tree* et / ou *blob*.

```sh
$ echo "docker" >> it367/cours.txt
$ git add .
$ git commit -m "docker"
$ git log
$ git cat-file -p <commit-id>
```

> Une propiété `parent` contient le hash du commit précédent.

### Suivi de version

#### Branche

Une branche est un simple fichier stocké dans le répertoire `.git/refs`.
Il contient un hash de commit.

La branche courante est enregistrée dans le fichier `.git/HEAD`.

```sh
$ git switch -c docker
$ echo "TP docker" > it367/docker.txt
$ git add .
$ git commit -m "tp docker"
$ cat .git/refs/heads/docker
$ cat .git/HEAD
```

#### Merge

Dans les cas simples, git fait un *fast forward*.
Il "déplace" le pointeur de commit.

```sh
$ git switch master
$ git merge docker
$ git log
$ cat .git/refs/heads/master
```

En cas de divergence entre 2 branches, git génère un commit de merge.

```sh
$ git switch -c tdd
$ mkdir it340
$ echo "TP TDD" > it340/tdd.txt
$ git add .
$ git commit -m "tp tdd"
```

```sh
$ git switch docker
$ echo "suite TP docker" >> it367/docker.txt
$ git add .
$ git commit -m "suite tp docker"
```

```sh
$ git switch master
$ git merge docker
$ git merge tdd
$ git log # on constate 2 commits parents
```

#### Rebase

Le rebase permet (entre autres) de conserver un historique linéaire en réordonnant les commits.

```sh
$ git switch docker
$ git merge master
$ echo "fin TP docker" >> it367/docker.txt
$ git add .
$ git commit -m "fin tp docker"
```

```sh
$ git switch tdd
$ echo "suite TP TDD" >> it340/tdd.txt
$ git add .
$ git commit -m "suite tp tdd"
```

```sh
$ git switch master
$ git merge docker
$ git switch tdd
$ git rebase master
$ git switch master
$ git merge tdd
```

#### Squash

Le `squash` permet de regrouper plusieurs commits en un seul afin d'avoir un historique plus clair.

```sh
$ git switch -c refacto
$ echo "début refacto" >> it340/refacto.txt
$ git add .
$ git commit -m "début tp refacto"

$ echo "suite refacto" >> it340/refacto.txt
$ git add .
$ git commit -m "suite tp refacto"

$ echo "fin refacto" >> it340/refacto.txt
$ git add .
$ git commit -m "fin tp refacto"
```

Pour réaliser un *squash*, on utilise la commande `rebase` en mode interactif.

```sh
$ git rebase -i HEAD~3
```

## Git flow

Ensemble d'extensions git définissant un modèle d'utilisation des branches.

> Exemple :
> - `git flow feature start <name>`
> - `git flow release publish <name>`
> - `git flow hotfix start <name>`

Le modèle présenté ci-dessous est une version simplifiée.

#### Branche `master`

Code correspondant à la production ou à la prochaine version déployée.
Les branches de fonctionnalité **ne sont pas** directement mergées sur `master`.
Cette branche doit rester stable (sinon il y a un problème sur la prod).

#### Branche `develop`

Code correspondant aux fonctionnalités qui seront mergées sur `master`.
Les branches de fonctionnalité sont créées à partir de `develop`.
Cette branche doit rester stable pour ne pas bloquer les nouvelles fonctionnalités.

#### Branche de fonctionnalité

Permet de travailler de manière isolée.

#### Tag

Créé depuis la branche `master`, un tag fige la version qui est déployée en production.
On peut tirer une branche de correction depuis un tag précédent si besoin.

#### Branche de correction

Si nécessaire, une branche de correction peut être tirée depuis `master` ou depuis un tag.
Cette branche doit ensuite être mergée sur `develop`.

## Alias

Les alias permettent de faciliter l'utilisation des commandes git au quotidien.
Ils sont stockés dans la configuration de git.

Il existe 3 fichiers pour gérer cette configuration :
- `/etc/gitconfig` (*system*)
- `~/.gitconfig` (*global*)
- `.git/config` (*local*)

On enregistre généralement les alias dans la config globale.

#### Alias basique

```sh
$ git config --global alias.st 'status'
```

> Créer un alias pour la commande `commit`

#### Commande externe simple

```sh
$ git config --global alias.cfg '!less ~/.gitconfig'
```

#### Commande externe avancée

```sh
$ git config --global alias.release '!f() { git tag $1; git push origin tag $1;}; f'
```

## Manipulation de commits

### Amend

> Permet de modifier le dernier commit

#### Modifier le message de commit

```sh
$ git commit --amend -m "nouveau message"
```

#### Ajouter une modification

```sh
$ git switch master
$ echo "task 1" > task1.txt
$ git add .
$ git commit -m "todo list"
$ echo "task 1.1" >> task1.txt
$ git add .
$ git commit --amend --no-edit

$ echo "task 2" > task2.txt
$ git add .
$ git commit --amend --no-edit
```

L'option no-edit permet de conserver le message du commit

> ATTENTION : ne modifier que des commits locaux

### Stash

> Permet de mettre de côté les modifications en cours

```sh
$ echo "task 2.1" >> task2.txt
$ git stash
$ git stash list
```

Pour récupérer les modifications, on peut utiliser la commande `stash apply` ou `stash pop`.
La seconde supprime le *stash*.

```sh
$ git stash apply
$ git stash list
$ git checkout task2.txt
$ git stash pop
$ git stash list
```

> Par défaut, git ne stash pas les fichiers non trackés

On peut utiliser l'option `-u` pour les ajouter plus facilement

```sh
$ echo "task 3" > task3.txt
$ git status
$ git stash -u
$ git status
```

On peut ajouter un message au *stash* pour mieux s'y retrouver

```sh
$ echo "task 1.2" >> task1.txt
$ git stash save "add task 1.2"
$ git stash list
```

### Reset

Git fonctionne avec 3 zones :
- *working directory*
- *staging index*
- *commit history*

> La commande `reset` permet de supprimer des commits
> et de revenir sur l'une des zones précédentes

```sh
$ git reset HEAD~1
$ git log
$ git status
$ git add .
$ git commit -m "todo list"
```

> Par défaut on revient sur le *working directory*

L'option `--soft` permet de revenir sur le *staging index*.

```sh
$ git reset --soft HEAD~1
$ git status
$ git commit -m "todo list"
```

L'option `--hard` supprime totalement les modifications.

```sh
$ git reset --hard HEAD~1
$ git status
```
