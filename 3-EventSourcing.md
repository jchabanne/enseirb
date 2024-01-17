# Event Sourcing

## Mise en place

Créer les fichiers :
 - eventStore.js
 - event.js

## Ajouter un patient

1. Définir une classe `Event` dans le fichier `event.js` avec les propriétés `name`, `patientId`, `payload` et `creationDate`

2. Définir un tableau `eventList` et une fonction `addEvent` dans le fichier `eventStore.js`

3. Modifier la fonction `addPatient` pour ajouter un évènement `patientAdded` avec le patient en payload, puis supprimer l'appel à la fonction `insertPatient`

## Modifier un patient

1. Définir une fonction `restorePatient(id)` qui récupère tous les évènements du patient et reconstruit l'entité

2. Modifier la fonction `savePatient` pour appeler la méthode `restorePatient`, ajouter un évèment `patientSaved` avec le nom et le prénom en payload, puis supprimer l'appel à la fonction `updatePatient`

## Bonus : optimisation

Gérer l'alimentation du tableau `patientList` et de l'objet `patientCache` de façon asynchrone via une file de messages.
