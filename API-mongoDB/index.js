const express = require('express')
const app = express()
require('dotenv').config()

/**
 * Connexion mongoDBF
 */
const MongoClient = require('mongodb').MongoClient;
const url = process.env.DB_HOST;
const dbName = process.env.DB_DATABASE;
let db

MongoClient.connect(url, function(err, client) {
  console.log("Connected successfully to server");
  db = client.db(dbName);
});


app.use(express.json())

app.get('/message', (req,res) => {
    db.collection('messages').find({}).toArray(function(err, docs) {
        if (err) {
            console.log(err)
            throw err
        }
        res.status(200).json(docs)
      }) 
})

app.get('/message/:id', async (req,res) => {
    const id = parseInt(req.params.id)
    try {
        const message = await db.collection('messages').findOne({id})
        res.status(200).json(message)
    } catch (err) {
        console.log(err)
        throw err
    }
})

app.post('/message', async (req,res) => {
    try {
        const messageData = req.body
        const message = await db.collection('messages').insertOne(messageData)
        res.status(200).json(message)
    } catch (err) {
        console.log(err)
        throw err
    }
    
})

app.listen(7033, () => {
    console.log("Serveur à l'écoute")
})