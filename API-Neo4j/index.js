const express = require('express')
const neo4j = require('neo4j-driver') 
const app = express()

const driver = neo4j.driver('bolt://localhost:7687')
const session = driver.session()

/* Vérification de la connexion à la BDD Neo4j */
app.get('/', (req,res) => {
    driver.verifyConnectivity()
    .then(() => {
        res.send("Connexion Neo4j: ✔️");
    }, () => {
        res.send("Connexion Neo4j: ❌");
    });
})

/* Module de formation */
app.get('/formation/:id', (req,res) => {
    const id = parseInt(req.params.id)

    session.run('MATCH (a:GRP2_formation {id: $id}) RETURN a', {id: id})
    .then(function (result) {
        const singleRecord = result.records[0]
        const node = singleRecord.get(0)

        res.send(node.properties);
    })
    .catch(function (error) {
        res.status(404).send(error)
    })
})

app.post('/formation/:id', (req,res) => {
    const id = parseInt(req.params.id)
    
    session.run('CREATE (a:GRP2_formation {id: $id}) RETURN a', { id: id })
    .then(function (result) {
        const singleRecord = result.records[0]
        const node = singleRecord.get(0)

        res.send(node.properties);
    })
    .catch(function (error) {
        res.status(404).send(error)
    })
})

app.delete('/formation/:id', (req,res) => {
    const id = parseInt(req.params.id)
    
    session.run('MATCH (a:GRP2_formation {id: $id}) DELETE a', { id: id })
    .then(function (result) {
        res.status(200);
    })
    .catch(function (error) {
        res.status(404).send(error)
    })
})

/* Unité Pédagogique */
app.get('/unite_pedagogique/:id', (req,res) => {
    const id = parseInt(req.params.id)

    session.run('MATCH (a:GRP2_unite_pedagogique {id: $id}) RETURN a', {id: id})
    .then(function (result) {
        const singleRecord = result.records[0]
        const node = singleRecord.get(0)

        res.send(node.properties);
    })
    .catch(function (error) {
        res.status(404).send(error)
    })
})

app.post('/unite_pedagogique/:id', (req,res) => {
    const id = parseInt(req.params.id)
    
    session.run('CREATE (a:GRP2_unite_pedagogique {id: $id}) RETURN a', { id: id })
    .then(function (result) {
        const singleRecord = result.records[0]
        const node = singleRecord.get(0)

        res.send(node.properties);
    })
    .catch(function (error) {
        res.status(404).send(error)
    })
})

app.delete('/unite_pedagogique/:id', (req,res) => {
    const id = parseInt(req.params.id)
    
    session.run('MATCH (a:GRP2_unite_pedagogique {id: $id}) DELETE a', { id: id })
    .then(function (result) {
        res.status(200);
    })
    .catch(function (error) {
        res.status(404).send(error)
    })
})

/* Utilisateur */
app.get('/utilisateur/:id', (req,res) => {
    const id = parseInt(req.params.id)

    session.run('MATCH (a:GRP2_utilisateur {id: $id}) RETURN a', {id: id})
    .then(function (result) {
        const singleRecord = result.records[0]
        const node = singleRecord.get(0)

        res.send(node.properties);
    })
    .catch(function (error) {
        res.status(404).send(error)
    })
})

app.post('/utilisateur/:id', (req,res) => {
    const id = parseInt(req.params.id)
    
    session.run('CREATE (a:GRP2_utilisateur {id: $id}) RETURN a', { id: id })
    .then(function (result) {
        const singleRecord = result.records[0]
        const node = singleRecord.get(0)

        res.send(node.properties);
    })
    .catch(function (error) {
        res.status(404).send(error)
    })
})

app.delete('/utilisateur/:id', (req,res) => {
    const id = parseInt(req.params.id)
    
    session.run('MATCH (a:GRP2_utilisateur {id: $id}) DELETE a', { id: id })
    .then(function (result) {
        res.status(200);
    })
    .catch(function (error) {
        res.status(404).send(error)
    })
})

/* Lancement du serveur */
app.listen(7034, () => {
    console.log('--- SERVEUR NEO4J ---')
})