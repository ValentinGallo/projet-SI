const express = require('express')
const app = express()

/**
 * Import MongoClient & connexion à la DB
 */
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'projet-SI';
let db
 
MongoClient.connect(url, function(err, client) {
  console.log("Connected successfully to server");
  db = client.db(dbName);
});


app.use(express.json())

app.get('/parkings', (req,res) => {
    res.status(200).json(parkings)
})

app.get('/parkings/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const parking = parkings.find(parking => parking.id === id)
    res.status(200).json(parking)
})

app.post('/parkings', (req,res) => {
    parkings.push(req.body)
    res.status(200).json(parkings)
})
app.put('/parkings/:id', (req,res) => {
    const id = parseInt(req.params.id)
    let parking = parkings.find(parking => parking.id === id)
    parking.name =req.body.name,
    parking.city =req.body.city,
    parking.type =req.body.type,
    res.status(200).json(parking)
})

app.delete('/parkings/:id', (req,res) => {
    const id = parseInt(req.params.id)
    let parking = parkings.find(parking => parking.id === id)
    parkings.splice(parkings.indexOf(parking),1)
    res.status(200).json(parkings)
})

app.listen(8080, () => {
    console.log("Serveur à l'écoute")
})