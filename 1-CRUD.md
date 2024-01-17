# CRUD

Dans le projet `IT340`, créer un dossier `architecture` ou bien créer une nouvelle branche `architecture` depuis la branche `main` s'il n'y a aucun commit sur cette dernière.

## Mise en place

Créer les fichiers :
 - client.js
 - patient.js
 - patientService.js
 - patientDAO.js
 - database.js

## Ajouter un patient

1. Définir une fonction `addPatient(lastName, firstName)` dans le fichier `patientService.js`

2. Définir une fonction `insertPatient(patient)` dans le fichier `patientDAO.js`

3. Définir un objet `database` dans le fichier `database.js` et ajouter une propriété `patient: []`

4. Définir une classe `Patient` dans le fichier `patient.js` avec les propriétés `id`, `lastName`, `firstName` et `creationDate`

5. Implémenter la fonction `addPatient` du service pour créer une instance de `Patient` et appeler la fonction `insertPatient` de la DAO

6. Implémenter la fonction `insertPatient` pour stocker le patient dans la propriété `patient` de la `database` et faire un `console.log` du tableau

7. Appeler la fonction `addPatient` depuis le fichier `client.js`

## Lister les patients

1. Définir une fonction `getPatientList` dans le fichier `patientService.js`

2. Définir une fonction `retrievePatientList` dans le fichier `patientDAO.js`

3. Implémenter la fonction `retrievePatientList` pour retourner la liste des patients mais sans la date de création

4. Implémenter la fonction `getPatientList` pour appeler la fonction `retrievePatientList` et retourner son résultat

5. Appeler la fonction `getPatientList` depuis le fichier `client.js` et faire un `console.log` du résultat

## Modifier un patient

1. Définir une fonction `savePatient(id, lastName, firstName)` dans le fichier `patientService.js`

2. Définir une fonction `updatePatient(patient)` dans le fichier `patientDAO.js`

3. Implémenter la fonction `savePatient` pour récupérer le patient depuis la DAO le modifier puis appeler la fonction `updatePatient`

4. Implémenter la fonction `updatePatient` mettre à jour le patient dans le tableau et faire un `console.log` du tableau

5. Appeler la fonction `savePatient` depuis le fichier `client.js`

## Récupérer un patient

1. Définir une fonction `getPatient(id)` dans le fichier `patientService.js`

2. Définir une fonction `retrievePatient(id)` dans le fichier `patientDAO.js`

3. Implémenter la fonction `retrievePatient` pour retourner le patient demandé mais avec une propriété `name` qui est la concaténation du nom et du prénom

4. Implémenter la fonction `getPatient` pour appeler la fonction `retrievePatient` et retourner son résultat

5. Appeler la fonction `getPatient` depuis le fichier `client.js` et faire un `console.log` du résultat
