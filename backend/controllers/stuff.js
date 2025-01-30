const Thing = require("../models/Thing");
const fs = require("fs");
/*
Ici, vous créez une instance de votre modèle Thing en lui passant un objet JavaScript contenant toutes les informations requises du corps de requête 
analysé (en ayant supprimé en amont le faux_id envoyé par le front-end).
*/

/*
Que fait le code ci-dessus ?

Pour ajouter un fichier à la requête, le front-end doit envoyer les données de la requête sous la forme form-data (sous forme d'objet) et non sous forme de JSON. Le corps de la requête contient une chaîne thing, qui est simplement un objetThing converti en chaîne. Nous devons donc l'analyser à l'aide de JSON.parse() pour obtenir un objet utilisable.

Nous supprimons le champ_userId de la requête envoyée par le client car nous ne devons pas lui faire confiance (rien ne l’empêcherait de nous passer le userId d’une autre personne). Nous le remplaçons en base de données par le _userId extrait du token par le middleware d’authentification.

Nous devons également résoudre l'URL complète de notre image, car req.file.filename ne contient que le segment filename. Nous utilisons req.protocol pour obtenir le premier segment (dans notre cas 'http'). Nous ajoutons '://', puis utilisons req.get('host') pour résoudre l'hôte du serveur (ici, 'localhost:3000'). Nous ajoutons finalement '/images/' et le nom de fichier pour compléter notre URL

*/
exports.createThing = (req, res, next) => {
    const thingObject = JSON.parse(req.body.thing);
    delete thingObject._id;
    delete thingObject._userId;
    const thing = new Thing({
        ...thingObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
        }`,
    });

    thing
        .save()
        .then(() => {
            res.status(201).json({ message: "Objet enregistré !" });
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

/*
nous exploitons la méthode updateOne() dans notre modèle Thing . Cela nous permet de mettre à jour le Thing qui correspond à l'objet que nous passons comme premier argument.
Nous utilisons aussi le paramètre id passé dans la demande, 
et le remplaçons par le Thing passé comme second argument.
*/
exports.modifyThing = (req, res, next) => {
    const thingObject = req.file
        ? {
              ...JSON.parse(req.body.thing),
              imageUrl: `${req.protocol}://${req.get("host")}/images/${
                  req.file.filename
              }`,
          }
        : { ...req.body };

    delete thingObject._userId;
    Thing.findOne({ _id: req.params.id })
        .then((thing) => {
            if (thing.userId != req.auth.userId) {
                res.status(401).json({ message: "Not authorized" });
            } else {
                Thing.updateOne(
                    { _id: req.params.id },
                    { ...thingObject, _id: req.params.id }
                )
                    .then(() =>
                        res.status(200).json({ message: "Objet modifié!" })
                    )
                    .catch((error) => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

/*
La méthode deleteOne() de notre modèle fonctionne comme findOne() et updateOne() dans le sens où nous lui passons un objet correspondant au document à supprimer.
Nous envoyons ensuite une réponse de réussite ou d'échec au front-end.
*/
exports.deleteThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
        .then((thing) => {
            if (thing.userId != req.auth.userId) {
                res.status(401).json({ message: "Not authorized" });
            } else {
                const filename = thing.imageUrl.split("/images/")[1];
                fs.unlink(`images/${filename}`, () => {
                    Thing.deleteOne({ _id: req.params.id })
                        .then(() => {
                            res.status(200).json({
                                message: "Objet supprimé !",
                            });
                        })
                        .catch((error) => res.status(401).json({ error }));
                });
            }
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
};
/*
si aucun Thing n'est trouvé ou si une erreur se produit, nous envoyons une erreur 404 au front-end, avec l'erreur générée.
nous utilisons ensuite la méthode findOne() dans notre modèle Thing pour trouver le Thing unique ayant le même _id que le paramètre de la requête ;
ce Thing est ensuite retourné dans une Promise et envoyé au front-end ;
*/
exports.getOneThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id }) // findOne()  – retourne un seul Thing basé sur la fonction de comparaison qu'on lui passe (souvent pour récupérer un Thing par son identifiant unique)
        .then((thing) => res.status(200).json(thing))
        .catch((error) => res.status(404).json({ error }));
};
/*
nous utilisons la méthode find() dans notre modèle Mongoose afin de renvoyer un tableau contenant tous les Things dans notre base de données. À présent, si vous ajoutez un Thing ,
il doit s'afficher immédiatement sur votre page d'articles en vente.
*/
exports.getAllThings = (req, res, next) => {
    Thing.find() // retourne tous les Things ;
        .then((thing) => res.status(200).json(thing))
        .catch((error) => res.status(400).json({ error }));
};
