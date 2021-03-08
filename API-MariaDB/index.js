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
        connection.query("SELECT users.id, identifiant, motDePasse, idRole, nom as nomRole FROM role INNER JOIN users ON role.id = users.idRole", function (error, results) {
            if (error) throw error;
                console.log('result :', results);
                res.status(200).json(results)
        });
       
    })

    app.get('/cd', (req,res) => {
        connection.query('SELECT * from cd', function (error, results) {
            if (error) throw error;
                console.log('result :', results);
                res.status(200).json(results)
        });
       
    })

    app.get('/moduleForm', (req,res) => {
        connection.query('SELECT * from mf', function (error, results) {
            if (error) throw error;
                console.log('result :', results);
                res.status(200).json(results)
        });
       
    })

    app.get('/selectMF/:identifiant', (req,res) => {
        const identifiant = req.params.identifiant
        connection.query("SELECT * FROM mf WHERE id IN ("+identifiant+")", function (error, results) {
            if (error) throw error;
                console.log('result :', results);
                res.status(200).json(results)
        });
       
    })
    //return all niveauForm
    app.get('/niveauForm', (req,res) => {
        connection.query('SELECT * from nf', function (error, results) {
            if (error) throw error;
                console.log('result :', results);
                res.status(200).json(results)
        });
       
    })
    //return toutes les roles
    app.get('/role', (req,res) => {
        connection.query('SELECT * from role', function (error, results) {
            if (error) throw error;
                console.log('result :', results);
                res.status(200).json(results)
        });
       
    })
    //retourne toutes les Unite pedagogique
    app.get('/unitePeda', (req,res) => {
        connection.query('SELECT * from up', function (error, results) {
            if (error) throw error;
                console.log('result :', results);
                res.status(200).json(results)
        });
       
    })
    //return toutes les informations d'un up des id selectionner
    app.get('/selectUP/:identifiant', (req,res) => {
        const identifiant = req.params.identifiant
        connection.query("SELECT * FROM up WHERE id IN ("+identifiant+")", function (error, results) {
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
        var sql2 = "SELECT id FROM users WHERE identifiant='"+identifiant+"';";
        connection.query(sql, function (error, results) {
            if (error){
                res.status(404).json(results)
            };

            console.log('result :', results);
            connection.query(sql2, function (error, results) {
                if (error){
                    res.status(404).json(results)
                };
                    console.log('result :', results.get('id'));
                    res.status(200).json(results.get('id'))
            });
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

    app.post('/moduleFormation', (req,res)=>{
        const nom = req.body.nom

        var sql = "INSERT INTO mf (nom) VALUES ('"+nom+"')";
        var sql2 = "SELECT id FROM mf WHERE nom='"+nom+"';";
        connection.query(sql, function (error, results) {
            if (error){
                res.status(404).json(results)
            };

            console.log('result :', results);
            connection.query(sql2, function (error, results) {
                if (error){
                    res.status(404).json(results)
                };
                    console.log('result :', results.get('id'));
                    res.status(200).json(results.get('id'))
            });
        });
    })

    app.post('/unitePeda', (req,res)=>{
        const nom = req.body.nom
        const url = req.body.url
        console.log("DATA------:nom :"+req.body.nom+" url:"+req.body.url+" ")

        var sql = "INSERT INTO up (nom,url) VALUES ('"+nom+"','"+url+"')";
        var sql2 = "SELECT id FROM up WHERE nom='"+nom+"' AND url='"+url+"';";
        connection.query(sql, function (error, results) {
            console.log("q1-----:"+results)

            if (error){
                console.log("q1-----:"+results)
                res.status(404).json()
                return
            };
            connection.query(sql2, function (error, results) {
                console.log("q2-----:"+results)

                if (error){
                    console.log("q2-----:"+results)
                    res.status(404).json()
                    return
                };
                res.status(200).json(results)
                return
            });
        });
    })

    app.post('/niveauForm', (req,res)=>{
        const nom = req.body.nom
        console.log("DATA------:nom :"+nom+"")

        var sql = "INSERT INTO nf (nom) VALUES ('"+nom+"')";
        var sql2 = "SELECT id FROM nf WHERE nom='"+nom+"';";
        connection.query(sql, function (error, results) {
            console.log("q1-----:"+results)

            if (error){
                console.log("q1-----:"+results)
                res.status(404).json()
                return
            };
            connection.query(sql2, function (error, results) {
                console.log("q2-----:"+results)

                if (error){
                    console.log("q2-----:"+results)
                    res.status(404).json()
                    return
                };
                res.status(200).json(results)
                return
            });
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

        var sql = "UPDATE users SET identifiant='"+identifiant+"', motDePasse='"+motDePasse+"', idRole="+idRole+" WHERE id="+id+"";
        connection.query(sql, function (error, results) {
            if (error) throw error;
                console.log('result :', results);
                res.status(200).json(results)
        });
    })
    //Delete
    app.delete('/user/:id', (req,res)=>{

        const id = parseInt(req.params.id)

        var sql = "Delete FROM users WHERE id="+id+"";
        connection.query(sql, function (error, results) {
            if (error) throw error;
                console.log('result :', results);
                res.status(200).json(results)
        });
    })

    app.delete('/role/:id', (req,res)=>{

        const id = parseInt(req.params.id)

        var sql = "Delete FROM role WHERE id="+id+"";
        connection.query(sql, function (error, results) {
            if (error) throw error;
                console.log('result :', results);
                res.status(200).json(results)
        });
    })

    app.delete('/unitePeda/:id', (req,res)=>{

        const id = parseInt(req.params.id)

        var sql = "Delete FROM up WHERE id="+id+"";
        connection.query(sql, function (error, results) {
            if (error){
                res.status(404).json(results)
            };
            console.log('result :', results);
            res.status(200).json(results)
        });
    })

    app.delete('/moduleFormation/:id', (req,res)=>{

        const id = parseInt(req.params.id)

        var sql = "Delete FROM mf WHERE id="+id+"";
        connection.query(sql, function (error, results) {
            if (error) throw error;
                console.log('result :', results);
                res.status(200).json(results)
        });
    })

    app.delete('/niveauForm/:id', (req,res)=>{

        const id = parseInt(req.params.id)

        var sql = "Delete FROM nf WHERE id="+id+"";
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