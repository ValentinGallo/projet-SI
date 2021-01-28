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
//////////
    app.get('/user', (req,res) => {
        connection.query('SELECT * from user', function (error, results) {
            if (error) throw error;
                console.log('result :', results);
                res.status(200).json(results)
        });
       
    })

    app.get('/user/prenom', (req,res) => {
        connection.query('SELECT prenom from user', function (error, results) {
            if (error) throw error;
                console.log('result :', results);
                res.status(200).json(results)
        });
       
    })

//////////////////
//Serveur
//////////////////

app.listen(8080, () => {
    console.log("Serveur à l'écoute")
})