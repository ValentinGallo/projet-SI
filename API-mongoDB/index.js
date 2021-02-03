const express = require('express')
const app = express()

/**
 * Import MongoClient & connexion à la DB
 */
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'projetSI';
let db

MongoClient.connect(url, function(err, client) {
  console.log("Connected successfully to server");
  db = client.db(dbName);
});


app.use(express.json())

app.get('/messages', (req,res) => {
    db.collection('messages').find({}).toArray(function(err, docs) {
        if (err) {
            console.log(err)
            throw err
        }
        res.status(200).json(docs)
      }) 
})

app.get('/messages/:_id', async (req,res) => {
    const _id = parseInt(ObjectId(req.params._id))
    try {
        const docs = await db.collection('messages').findOne({_id})
        res.status(200).json(docs)
    } catch (err) {
        console.log(err)
        throw err
    }
})

app.listen(7033, () => {
    console.log("Serveur à l'écoute")
})