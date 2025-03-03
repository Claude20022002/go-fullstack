# go-fullstack

Ceci est ma première formation backend sur OpenClassrom

Pour initialiser le backend on fait
npm init
on installe mongoose, express

// le fichier .gitignore permet de déclarer des élément qui n'ont pas besoin d'être sauvegarder sur github

Dans notre backend nous implementerons le CRUD complet dans le fichier app.js donc:

create (création de ressources) ;

read (lecture de ressources) ;

update (modification de ressources) ;

delete (suppression de ressources).

L'application permet un parcours client complet dans les articles renseigné !

**_ Dans le fichier server.js nous y rétrouvons la définition du port d'écoute et la création d'un serveur
_** Dans Thing nous rétrouvons le schema de notre table Thing

nous avons créée des routes et controlleurs pour libérer le code et permettre un bonne maintenance du code
ceux là permet de séparer la logique de chaque api avec leurs chemins d'accès

La méthode express.Router() vous permet de créer des routeurs séparés pour chaque route principale de votre application – vous y enregistrez ensuite les routes individuelles.

Un fichier de contrôleur exporte des méthodes qui sont ensuite attribuées aux routes pour améliorer la maintenabilité de votre application.

pour empêcher que des utilisateur créer plusieurs compte avec l'adresse email on utilise mongoose-unique-validator qu'il faut installer mais ne fonction que sur mongoose@^7.0.0 qu'il faut installer également
donc: npm install mongoose@^7.0.0 puis npm install --save mongoose-unique-validator

-   Pour éviter de changer de version:

---

Il se peut que vous ayez besoin d'ajouter le flag --force à la commande ci-dessus si jamais vous installez le validateur peu de temps après l'arrivée d'une nouvelle version de mongoose :
parfois les personnes qui s'occupent du package validateur mettent un peu de temps pour le mettre à jour. Mais ne nous frustrons pas : ils font un super travail d'open source bénévole !

---

aussi il faut installer bcrypt pou le hashage des mot de passe et jsonwebtoken pour générer automatiquement des tokens
avec la commande npm install bcrypt; npm install jsonwebtoken

Egalement installe multer qui permettre aux utilisateurs éffectuer des télécgargements
implémenter des téléchargements de fichiers pour que les utilisateurs puissent télécharger des images d'articles à vendre.
Pour ce faire, nous utiliserons multer , un package qui nous permet de gérer les fichiers entrants dans les requêtes HTTP.

JSON.parse() transforme un objet stringifié en Object JavaScript exploitable.

Vous aurez besoin dereq.protocol et de req.get('host'), connectés par '://' et suivis de req.file.filename, pour reconstruire l'URL complète du fichier enregistré.

Configurez votre serveur pour renvoyer des fichiers statiques pour une route donnée avec express.static() et path.join().

En résumé

Le package fs expose des méthodes pour interagir avec le système de fichiers du serveur.

La méthode unlink() du package fs vous permet de supprimer un fichier du système de fichiers.

Qu'avez-vous appris dans cette partie ?
Vous avez presque terminé. Bravo !

Regardons ce que vous avez appris :

Vous avez créé un serveur Node et l'avez utilisé pour servir une application Express.

Vous avez connecté votre application à une base de données MongoDB et, à l'aide de Mongoose, vous avez créé une API RESTful permettant les opérations CRUD (Create, Read, Update and Delete, soit Créer, Lire, Modifier et Supprimer).

Vous avez implémenté une authentification sécurisée à base du token JWT.

Enfin, vous avez implémenté la gestion du téléchargement de fichiers, permettant ainsi aux utilisateurs d'ajouter et de supprimer des images.
