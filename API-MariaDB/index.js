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


//////////////////
//GET
//////////////////

    //Selection global
    app.get('/user', (req,res) => {
        connection.query('SELECT * from user', function (error, results) {
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
        connection.query('SELECT id FROM user WHERE id ='+id, function (error, results) {
            if (error) throw error;
                console.log('result :', results);
                res.status(200).json(results)
        });
       
    })

    app.get('/user/motDePasse/:id', (req,res) => {
        const id = parseInt(req.params.id)
        connection.query('SELECT motdepasse FROM user WHERE id ='+id, function (error, results) {
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