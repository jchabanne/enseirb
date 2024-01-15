# Transférer de l'argent sur un autre compte

1. Dans le fichier `bank.js` définir une fonction `transferMoney` qui prend 2 paramètres: `accountId` et `amount`

2. Créer un fichier bankTransfer.js` et définir une fonction `transfer` qui prend 2 paramètres: `accountId` et `amount`

3. Appeler la fonction `transfert` depuis la fonction `transferMoney` puis écrire un test qui valide l'appel avec les bons paramètres

4. Dans le fichier `bankDAO.js` définir une fonction `debitAccount` qui prend 2 paramètres: `accountId` et `amount`

5. Appeler la fonction `debitAccount` depuis la fonction `transferMoney` puis écrire un test qui valide l'appel avec les bons paramètres

6. Si le transfert ne se passe pas bien (la fonction `transfert` retourne une promesse rejetée), ne pas appeler la fonction `debitAccount`. Ecrire un test qui valide ce fonctionnement 
