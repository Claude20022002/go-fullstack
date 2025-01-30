const http = require("http");
const app = require("./app"); // importation du module app.js que l'on a créer

app.set("port", process.env.PORT || 3000);
const server = http.createServer(app); // creation du serveur

server.listen(process.env.PORT || 3000); // ici nous demandons à écouter sur le PORT 3000 si il est disponible sinon on demande à l'ordinateur un autre PORT disponible
// soit la variable d'environnement du port grâce à process.env.PORT : si la plateforme de déploiement propose un port par défaut, c'est celui-ci qu'on écoutera ;
// soit le port 3000, ce qui nous servira dans le cas de notre plateforme de développement.
