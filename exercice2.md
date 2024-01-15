# Récupérer le solde d'un compte bancaire

1. Créer un fichier `bank.js` et définir une fonction `getBalance`

2. Créer un fichier `bankDAO.js` et définir une fonction `retrieveBalance` qui affiche un log "Retrieve balance"

3. Appleler la fonction `retrieveBalance` depuis la fonction getBalance`

4. Créer un fichier `main.js`, appeler la fonction `getBalance` et vérifier que le log s'affiche

5. Ecrire un test qui valide que la fonction `retrieveBalance` est bien appelée mais sans éxécuter cette dernière (le log ne doit pas s'afficher dans la console du test)

6. Ajouter un paramètre `accountId` aux fonctions `getBalance` et `retriveBalance` puis écrire un test qui vérifie que le paramètre est bien transmis.

7. Modifier la fonction `getBalance` pour renvoyer le solde retourné par la fonction `retrieveBalance` puis écrire un test qui vérifie que le solde est bien renvoyé.
