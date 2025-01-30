const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const stuffRoutes = require("./routes/stuff");
const userRoutes = require("./routes/user");
// Connexion à la base de donnée mongoose
mongoose
    .connect(
        "mongodb+srv://clusamote:8Q6g1JGEHK9NXsdM@cluster0.ha0te.mongodb.net/sample_mflix?retryWrites=true&w=majority"
    )
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch((error) => console.log("Connexion à MongoDB échouée : ", error));

const app = express(); // instantation de express

// le header pour permettre de faire la liaison entre le frontend qet le backend car ils sont sur des PORT different (4200;3000)
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

app.use(express.json()); //  c'est pareil que app.use(bodyParser.json())
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/stuff", stuffRoutes); // appels des differentes routes des api
app.use("/api/auth", userRoutes);

module.exports = app; // exportation de app vers server.js
