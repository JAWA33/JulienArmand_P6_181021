HOT TAKES

Projet 6 - OC developpeur web

//------ Pré-requis "frontend du projet":

Vous aurez également besoin du frontend disponible ici :
https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6.git

Pour le frontend : Voici les dépendances à installer :
NodeJS 12.14 or 14.0.
Angular CLI 7.0.2.
node-sass : assurez vous de la correspondance des versions avec NodeJS.

Puis, cloner le repo du frontend puis,
lancer la commande : npm install,
et lancer la commande : npm install --save-dev run-script-os.

Pour ouvrir le projet dans le navigateur :
Entrer la commande : npm start

En cas de problème, voir les informations complémentaires sur le README.md du dépot GIT correspondant.

//----- Installation du serveur "backend", ce depot GIT :

Commencer par ce dépot git, puis lancer npm install pour télécharger le node_modules.

Vous aurez besoin des packages suivants :

"bcrypt": "^5.0.1",
"cors": "^2.8.5",
"dotenv": "^10.0.0",
"express": "^4.17.1",
"jsonwebtoken": "^8.5.1",
"mongoose": "^6.0.11",
"mongoose-unique-validator": "^3.0.0",
"multer": "^1.4.3",

Vous devrez également créer les éléments suivants :
1.un dossier images dans le dossier racine
2.un fichier .env avec les informations suivant :
les informations de connexions à la base de données MongoDB :
DB_USER_PASS de type "compteMongoDB:Motdepasse"
une variable complémentaire au TOKEN :
TOKEN_SECRET de type string

Pour lancer le serveur sur le port 3000 :
Entrer npm start
