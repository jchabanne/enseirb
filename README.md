# WEB 

## Accessibilité (A11y)

Des normes existent pour définir différents critères qui permettent de valider qu'un site (ou application) est accessible au plus grand nombre.

#### [WCAG](https://www.w3.org/TR/WCAG22/) (Web Content Accessibility Guidelines)

Maintenu par le W3C dans le cadre du WAI (Web Accessibility Initiative)

Version 2.2 depuis octobre 2023

#### [RGAA](https://accessibilite.numerique.gouv.fr/) (Référentiel Général d'Amélioration de l'Accessibilité)

Maintenu par le gouvernement

Version 4.1.2

## CSS

1996 : première version de CSS

2006 : première version de SASS

2009 : première version de Less

Aujourd'hui, la plus-value des préprocesseurs est minime.

### Exercice

Editer le fichier `index.html`

#### Partie 1

1. Définir la couleur du texte du header et du footer avec la valeur `green`

> Attention au contraste !

2. Comment gérer les bordures en appliquant le même principe ?

3. Définir une échelle d'espace pour dénifir le padding du header, du footer et de la section

#### Partie 2

1. Définir 3 tailles de police différentes pour le header, les sections et le footer

2. Modifier l'échelle d'espace pour utiliser les mêmes unités

3. Borner la `font-size` du header de manière à ce qu'elle ne dépasse pas `80px`, même si on augmente la `font-size` de base

4. Borner la `font-size` du header de manière à ce qu'elle fasse au moins `32px`, même si on diminue la `font-size` de base

#### Partie 3

1. Définir une hauteur de `5rem` et une largeur de `50%` pour le header

2. Aligner le text à droite pour le footer

#### Partie 4 : reduce animation

1. Ajouter la propriété `animation: font-slide 2s linear  infinite;` sur la classe `header` et définir l'animation `font-slide`

```css
@keyframes font-slide {
  from {
    text-align: start;
  }
  
  50% {
    text-align: center;
  }
  
  to {
    text-align: end;
  }
}
```

2. Utiliser la *media feature* `prefers-reduced-motion` pour désactiver l'animation le cas échéant

#### Partie 5 : flexbox

[CSS Tricks](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

[Flexbox Froggy](https://flexboxfroggy.com/)

1. Disposer les 2 sections côte à côte

2. AJouter une sidebar sur la gauche faisant toute la hauteur de la page

#### Partie 6 : grid

[CSS Tricks](https://css-tricks.com/snippets/css/complete-guide-grid/)

1. Disposer la sidebar, le header, les sections et le footer dans un *grid layout*

#### Partie 7 : media / container query

1. Encapsuler les 2 sections dans une `div` *flex* et simplifier le *layout grid* pour conserver le même rendu

2. Utiliser une *media query* pour disposer verticalement les sections si la largeur de l'écran est inférieure à un certain seuil

3. Utiliser une *container query* pour diminuer la `font-size` des sections si la largeur du *container* est inférieure à un certain seuil

## Ressources

https://lea.verou.me/

https://www.joshwcomeau.com/
