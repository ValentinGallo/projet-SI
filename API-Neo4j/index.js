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
    
    session.run('MATCH (a:GRP2_formation {id: $id}) DETACH DELETE a', { id: id })
    .then(function () {
        res.status(200).send();
    })
    .catch(function (error) {
        res.status(404).send(error)
    })
})

/* Unité Pédagogique */
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
    
    session.run('MATCH (a:GRP2_unite_pedagogique {id: $id}) DETACH DELETE a', { id: id })
    .then(function () {
        res.status(200).send();
    })
    .catch(function (error) {
        res.status(404).send(error)
    })
})

/* Utilisateur */
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
    
    session.run('MATCH (a:GRP2_utilisateur {id: $id}) DETACH DELETE a', { id: id })
    .then(function () {
        res.status(200).send()
    }).catch(function (error) {
        res.status(404).send(error)
    })
})

/* OBTENIR DES RELATIONS */
app.get('/utilisateur/:id', (req,res) => {
    const id = parseInt(req.params.id)

     // Permet d'obtenir les UP d'un utilisateur
    session.run('MATCH (a:GRP2_utilisateur {id: $id})-[b]-(c) RETURN c', {id: id})
    .then(function (results) {
            var unite_pedagogique = []
            results.records.forEach((record) => {
                if (record._fields[0].properties.id != null) {
                    unite_pedagogique.push({
                        id: record._fields[0].properties.id,
                    })
                }
            })

            res.send(unite_pedagogique)
    })
    .catch(function (error) {
        res.status(404).send(error)
    })
})


app.get('/formation/:id', (req,res) => {
    const id = parseInt(req.params.id)

    // Permet d'obtenir les unités pédagogique d'un module de formation
    session.run('MATCH (a:GRP2_formation {id: $id})-[b]-(c) RETURN c', {id: id})
    .then(function (results) {
        var module_formation = []
        results.records.forEach((record) => {
            if (record._fields[0].properties.id != null) {
                module_formation.push({
                    id: record._fields[0].properties.id,
                })
            }
        })

        res.send(module_formation)
    })
    .catch(function (error) {
        res.status(404).send(error)
    })
})
    
/* CREER DES RELATIONS */
app.post('/formation_up/:id_formation/:id_up', (req,res) => {
    const id_formation = parseInt(req.params.id_formation)
    const id_up        = parseInt(req.params.id_up)
    
    session.run('MATCH (a:GRP2_formation), (b:GRP2_unite_pedagogique) WHERE a.id = $id_formation AND b.id = $id_unite_pedagogique CREATE (a)-[r:RELTYPE]->(b) RETURN type(r)', { id_formation: id_formation, id_unite_pedagogique: id_up})
    .then(function (result) {
        const singleRecord = result.records[0]
        const node = singleRecord.get(0)

        res.send(node.properties);
    })
    .catch(function (error) {
        res.status(404).send(error)
    })
})

app.post('/utilisateur_up/:id_utilisateur/:id_up', (req,res) => {
    const id_utilisateur = parseInt(req.params.id_utilisateur)
    const id_up          = parseInt(req.params.id_up)
    
    session.run('MATCH (a:GRP2_utilisateur), (b:GRP2_unite_pedagogique) WHERE a.id = $id_utilisateur AND b.id = $id_unite_pedagogique CREATE (a)-[r:RELTYPE]->(b) RETURN type(r)', { id_utilisateur: id_utilisateur, id_unite_pedagogique: id_up})
    .then(function (result) {
        const singleRecord = result.records[0]
        const node = singleRecord.get(0)

        res.send(node.properties);
    })
    .catch(function (error) {
        res.status(404).send(error)
    })
})

/* Backup Neo4j */
app.get('/backup', (req,res) => {
    session.run('CALL apoc.export.csv.all(null, {stream:true}) YIELD data RETURN data')
    .then(function(result) {
        res.charset = 'utf-8';
        res.set({"Content-Disposition":"attachment; filename=\"neo4j.csv\""});
        res.send(result.records[0]._fields[0]);
    })
    .catch(function (error) {
        res.status(404).send(error)
    })
})

/* Lancement du serveur */
app.listen(7034, () => {
    console.log('--- SERVEUR NEO4J ---')
})