const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const jwt = require("jsonwebtoken");
const mysql = require("mysql2/promise")
const swaggerDocument = require("./swagger-output.json")
const SwaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const app = express();

//Variable d'environnement
require("dotenv").config();
const PORT = process.env.PORT

const hostname = "172.20.10.2";
const monRouteur = express.Router();

//Pour utiliser bodyparser
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//Permet de parser les requetes
app.use(express.json());

//Bcrypt
const bcrypt = require("bcrypt");

//Connexion à la base de données
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB,
    waitForConnections: true,
    connectionLimit: process.env.CONNECTION_LIMIT,
    queueLimit:0,
})

// Nous permet de définir les origines et le type de requêtes
app.use(function (req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Type", "application/json");
    next();
})

// Démarrage du serveur
http.createServer(app).listen(PORT, hostname, function (){
    console.log("Mon serveur fonctionne sur http://" + hostname + ":" + PORT + "\n");
})
// Pour accéder à l'api, on marque notre URL/api
app.use("/api", monRouteur);

require("./endpoints")(monRouteur, pool, bcrypt, jwt);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));