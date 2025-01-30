// Authentification par token
const jwt = require("jsonwebtoken");
/*
    Dans ce middleware :

Étant donné que de nombreux problèmes peuvent se produire, nous insérons tout à l'intérieur d'un bloc try...catch.

Nous extrayons le token du header Authorization de la requête entrante. N'oubliez pas qu'il contiendra également le mot-clé Bearer. Nous utilisons donc la fonction split pour tout récupérer après l'espace dans le header. Les erreurs générées ici s'afficheront dans le bloc catch.

Nous utilisons ensuite la fonction verify pour décoder notre token. Si celui-ci n'est pas valide, une erreur sera générée.

Nous extrayons l'ID utilisateur de notre token et le rajoutons à l’objet Request afin que nos différentes routes puissent l’exploiter.

Dans le cas contraire, tout fonctionne et notre utilisateur est authentifié. Nous passons à l'exécution à l'aide de la fonction next().

Maintenant, nous devons appliquer ce middleware à nos routes stuff, qui sont celles à protéger. Dans notre routeur stuff, nous importons notre middleware et le passons comme argument aux routes à protéger :
*/
module.exports = (req, res, next) => {
    try {
        const token = req.hearder.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET"); // La méthode verify() du package jsonwebtoken permet de vérifier la validité d'un token (sur une requête entrante, par exemple)
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId,
        };
    } catch (error) {
        res.status(401).json({ error });
    }
};
