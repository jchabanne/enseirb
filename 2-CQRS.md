# CQRS

## Mise en place

Créer les fichiers :
 - patientCommand.js
 - patientQuery.js
 - patientCommandDAO.js
 - patientQueryDAO.js

## Ajouter un patient

1. Copier la fonction `addPatient` dans le fichier `patientCommand.js`

2. Copier la fonction `insertPatient` dans le fichier `patientCommandDAO.js` 

3. Appeler la nouvelle fonction `addPatient` depuis le fichier `client.js`

## Lister les patients

1. Copier la fonction `getPatientList` dans le fichier `patientQuery.js`

2. Copier la fonction `retrievePatientList` dans le fichier `patientQueryDAO.js`

3. Appeler la nouvelle fonction `getPatientList` depuis le fichier `client.js`

## Modifier un patient

1. Copier la fonction `savePatient` dans le fichier `patientCommand.js`

2. Copier la fonction `updatePatient` dans le fichier `patientCommandDAO.js`

3. Appeler la nouvelle fonction `savePatient` depuis le fichier `client.js` 

## Récupérer un patient

1. Copier la fonction `getPatient` dans le fichier `patientQuery.js`

2. Copier la fonction `retrievePatient` dans le fichier `patientQueryDAO.js`

3. Appeler la nouvelle fonction `getPatient` depuis le fichier `client.js`

## Améliorer la liste des patients

1. Ajouter une propriété `patientList: []` dans l'objet `database`

2. Modifier la fonction `addPatient` pour ajouter également un patient dans la propriété `patientList` mais sans la date de création

3. Modifier la fonction `savePatient` pour mettre à jour le patient dans la propriété `patientList` mais sans la date de création

4. Modifier la fonction `retrievePatientList` pour retourner la propriété `patientList`

## Améliorer la récupération d'un patient

1. Créer un fichier `cache.js`

2. Définir un objet `patientCache` dans le fichier `cache.js`

3. Modifier la fonction `addPatient` pour ajouter le patient avec la propriété `name` dans l'objet `patientCache` avec pour clé l'id du patient

4. Modifier la fonction `savePatient` pour mettre à jour le patient avec la propriété `name` dans l'objet `patientCache`

5. Modifier la fonction `retrievePatient` pour retourner le patient depuis l'objet `patientCache`
