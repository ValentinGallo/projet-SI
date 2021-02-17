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
app.use(cors());

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
    app.get('/user/:identifiant', (req,res) => {
        const identifiant = req.params.identifiant
        
        connection.query("SELECT users.id, identifiant, motDePasse, idRole, nom as nomRole FROM role INNER JOIN users ON role.id = users.idRole WHERE users.identifiant='"+identifiant+"'", function (error, results) {
            if (error) throw error;
                console.log('result :', results);
                res.status(200).json(results)
        });
       
    })

    //Post create
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

    //Update
    app.put('/role', (req,res)=>{

        const id = req.body.id
        const nom = req.body.nom

        var sql = "UPDATE role SET nom = '"+nom+"' WHERE id='"+id+"'";
        connection.query(sql, function (error, results) {
            if (error) throw error;
                console.log('result :', results);
                res.status(200).json(results)
        });
    })

    app.put('/user', (req,res)=>{

        const id = req.body.id
        const identifiant = req.body.identifiant
        const motDePasse = req.body.motDePasse
        const idRole = req.body.idRole

        var sql = "UPDATE users SET identifiant='"+identifiant+"', motDePasse='"+motDePasse+"', idRole='"+idRole+"' WHERE id='"+id+"'";
        connection.query(sql, function (error, results) {
            if (error) throw error;
                console.log('result :', results);
                res.status(200).json(results)
        });
    })
    //Delete
    app.delete('/user/:id', (req,res)=>{

        const id = parseInt(req.params.id)

        var sql = "Delete FROM users WHERE id='"+id+"'";
        connection.query(sql, function (error, results) {
            if (error) throw error;
                console.log('result :', results);
                res.status(200).json(results)
        });
    })

    app.delete('/role/:id', (req,res)=>{

        const id = parseInt(req.params.id)

        var sql = "Delete FROM role WHERE id='"+id+"'";
        connection.query(sql, function (error, results) {
            if (error) throw error;
                console.log('result :', results);
                res.status(200).json(results)
        });
    })

//REACT
app.get('/formulaire',(req,res)=>{
	res.sendFile(path.join(__dirname,"reactFetch.html"))
});

//////////////////
//Serveur
//////////////////

app.listen(7032, () => {
    console.log("Serveur à l'écoute")
})