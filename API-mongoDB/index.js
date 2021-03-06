const express = require('express')
const app = express()
require('dotenv').config()

/**
* Connexion mongoDBF
*/
const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
const url = process.env.DB_HOST;
const dbName = process.env.DB_DATABASE;
const PORT = 7033;
let db

MongoClient.connect(url, function(err, client) {
    console.log("Connecter à mongoDB !");
    db = client.db(dbName);
});


const cors = require('cors');
app.use(cors());

app.use(express.json())

// Renvoie la liste des messages
app.get('/message', (req,res) => {
    db.collection('messages').find({}).toArray(function(err, docs) {
        if (err) {
            console.log(err)
            throw err
        }
        res.status(200).json(docs)
    }) 
})

// Renvoie les données du message [id]
app.get('/message/:_id', async (req,res) => {
    const _id = req.params._id
    try {
        const message = await db.collection('messages').findOne(ObjectId(_id))
        res.status(200).json(message)
    } catch (err) {
        console.log(err)
        throw err
    }
})

// Insert le message dans la base de donnée
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

// Supprime le message [id]
app.delete('/message/:_id', async (req,res) => {
    try {
        const _id = req.params._id
        const message = await db.collection('messages').deleteOne( {"_id": ObjectId(_id)})
        res.status(200).json(message)
    } catch (err) {
        console.log(err)
        throw err
    } 
})

// Renvoie les messages entre 2 utilisateurs [idExpediteur] [idDestinataire]
app.get('/disscussion/:idExpediteur/:idDestinataire', async (req,res) => {
    const idExpediteur = parseInt(req.params.idExpediteur)
    const idDestinataire = parseInt(req.params.idDestinataire)
    try {
        const message = await db.collection('messages').find( { idExpediteur: {"$in":[idExpediteur,idDestinataire]}, idDestinataire: {"$in":[idExpediteur,idDestinataire]} } ).sort({dateEnvoi: 1}).toArray()
        
        res.status(200).json(message)
    } catch (err) {
        console.log(err)
        throw err
    }
})


app.listen(PORT, () => {
    console.log("Serveur à l'écoute sur le port "+PORT)
})