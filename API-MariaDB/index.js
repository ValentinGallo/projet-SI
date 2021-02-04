const express = require('express')
const app = express()
const mysql = require('mysql')
require('dotenv').config()

let connection = mysql.createConnection({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    password: process.env.DB_PWD,
    database: process.env.DB_DATABASE
});
connection.connect();
app.use(express.json())

const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000/', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

//////////////////
//GET
//////////////////

    //Selection global
    app.get('/user', (req,res) => {
        connection.query('SELECT * from users', function (error, results) {
            if (error) throw error;
                console.log('result :', results);
                res.status(200).json(results)
        });
       
    })

    app.get('/cp', (req,res) => {
        connection.query('SELECT * from cp', function (error, results) {
            if (error) throw error;
                console.log('result :', results);
                res.status(200).json(results)
        });
       
    })

    app.get('/mf', (req,res) => {
        connection.query('SELECT * from mf', function (error, results) {
            if (error) throw error;
                console.log('result :', results);
                res.status(200).json(results)
        });
       
    })

    app.get('/nf', (req,res) => {
        connection.query('SELECT * from nf', function (error, results) {
            if (error) throw error;
                console.log('result :', results);
                res.status(200).json(results)
        });
       
    })

    app.get('/role', (req,res) => {
        connection.query('SELECT * from role', function (error, results) {
            if (error) throw error;
                console.log('result :', results);
                res.status(200).json(results)
        });
       
    })

    app.get('/up', (req,res) => {
        connection.query('SELECT * from up', function (error, results) {
            if (error) throw error;
                console.log('result :', results);
                res.status(200).json(results)
        });
       
    })

    //Select dans la table USER
    app.get('/user/:id', (req,res) => {
        const id = parseInt(req.params.id)
        
        connection.query('SELECT users.id, identifiant, motDePasse, idRole, nom as nomRole FROM role INNER JOIN users ON role.id = users.idRole WHERE users.id='+id, function (error, results) {
            if (error) throw error;
                console.log('result :', results);
                res.status(200).json(results)
        });
       
    })

    //Post
    app.post('/user', (req,res)=>{
        const identifiant = req.body.identifiant
        const motDePasse = req.body.motDePasse
        const idRole = parseInt(req.body.idRole)

        var sql = "INSERT INTO users (identifiant, motDePasse, idRole) VALUES ('"+identifiant+"','"+motDePasse+"','"+idRole+"')";
        connection.query(sql, function (error, results) {
            if (error) throw error;
                console.log('result :', results);
                res.status(200).json(results)
        });
    })

    app.post('/role', (req,res)=>{
        const nom = req.body.nom

        var sql = "INSERT INTO role (nom) VALUES ('"+nom+"')";
        connection.query(sql, function (error, results) {
            if (error) throw error;
                console.log('result :', results);
                res.status(200).json(results)
        });
    })



//////////////////
//Serveur
//////////////////

app.listen(7032, () => {
    console.log("Serveur à l'écoute")
})