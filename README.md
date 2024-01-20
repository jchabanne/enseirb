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

- Créer une branche `web` depuis la branche `main`.
- Récupérer les fichiers dans le dossier `tp`.

> Exécuter la commande `npx http-server` pour tester le fichier html

1. Définir la couleur du texte du *header* et du *footer* avec la valeur `green`.

2. Avec le même principe, appliquer une bordure sur le *header* et le *footer* `2px solid crimson`.

3. Définir la `font-size` du *header* à 48px et celle du *footer* à 12px.

4. Borner la `font-size` *du header* pour ne pas qu'elle dépasse 80px et qu'elle fasse au moins 20px.

5. Définir une échelle d'espace pour gérer le :
   - padding du *header* (espace moyen)
   - le padding du *footer* (espace fin)
   - le gap dans la *gallery* (espace large)

6. Aligner le texte du *header* à gauche;

7. Définir la hauteur du *header* à 10rem.

8. Définir la marge entre le *header*, la *gallery* et le *footer* (espace large).

Ajouter l'animation suivante dans le fichier `gallery.css` :

```css
@keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-30px);
    }
    60% {
        transform: translateY(-15px);
    }
}
```

Ajouter la propriété `animation: bounce 1s ease-in-out;` au *hover* d'une image.

9. Désactiver l'animation si le flag `prefers-reduced-motion` est actif.

## Ressources

https://lea.verou.me/

https://www.joshwcomeau.com/

https://css-tricks.com/
